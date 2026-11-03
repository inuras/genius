#!/usr/bin/env python3
"""Minimal web page server (Python standard library only).

Serves static files from ./public and exposes a small JSON API.
Text files (HTML, CSS, JS...) are gzip-compressed, and audio/images are cached by browsers.

Usage:
    python3 server.py [--host HOST] [--port PORT]
"""
import argparse
import gzip
import io
import json
import os
import threading
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PUBLIC_DIR = Path(__file__).resolve().parent / "public"

# File types worth compressing (mp3, jpg, png... are already compressed).
COMPRESSIBLE = {".html", ".css", ".js", ".json", ".svg", ".txt", ".xml", ".md"}
# Files that rarely change: browsers may reuse them for a week without asking again.
LONG_CACHE = {".mp3", ".ogg", ".wav", ".jpg", ".jpeg", ".png", ".webp", ".gif", ".woff2", ".pdf", ".apkg"}

_gzip_cache = {}  # path -> (mtime, size, compressed bytes)
_gzip_lock = threading.Lock()


def _gzipped(path, st):
    with _gzip_lock:
        hit = _gzip_cache.get(path)
        if hit and hit[0] == st.st_mtime_ns and hit[1] == st.st_size:
            return hit[2]
    with open(path, "rb") as f:
        data = gzip.compress(f.read(), compresslevel=6)
    with _gzip_lock:
        _gzip_cache[path] = (st.st_mtime_ns, st.st_size, data)
    return data


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC_DIR), **kwargs)

    def do_GET(self):
        if self.path.split("?", 1)[0] == "/api/health":
            self._send_json({"status": "ok", "time": datetime.now(timezone.utc).isoformat()})
            return
        super().do_GET()

    def send_response(self, code, message=None):
        self._status = code
        super().send_response(code, message)

    def end_headers(self):
        # self.path is missing on malformed requests, so fall back to "".
        ext = os.path.splitext(getattr(self, "path", "").split("?", 1)[0])[1].lower()
        if ext in LONG_CACHE and getattr(self, "_status", 200) < 400:
            self.send_header("Cache-Control", "public, max-age=604800")
        else:
            # Always check for a newer version (cheap: unchanged files answer "304 Not Modified").
            self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def send_head(self):
        """Like the standard version, but sends text files gzip-compressed when the browser accepts it."""
        path = self.translate_path(self.path)
        if os.path.isdir(path) and self.path.split("?", 1)[0].endswith("/"):
            path = os.path.join(path, "index.html")
        ext = os.path.splitext(path)[1].lower()
        accepts_gzip = "gzip" in self.headers.get("Accept-Encoding", "")
        if ext not in COMPRESSIBLE or not accepts_gzip or not os.path.isfile(path):
            return super().send_head()

        st = os.stat(path)
        etag = f'"{st.st_mtime_ns:x}-{st.st_size:x}-gz"'
        if self.headers.get("If-None-Match") == etag:
            self.send_response(304)
            self.send_header("ETag", etag)
            self.send_header("Vary", "Accept-Encoding")
            self.end_headers()
            return None

        body = _gzipped(path, st)
        self.send_response(200)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Content-Encoding", "gzip")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Vary", "Accept-Encoding")
        self.send_header("ETag", etag)
        self.send_header("Last-Modified", self.date_time_string(st.st_mtime))
        self.end_headers()
        return io.BytesIO(body)

    def _send_json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main():
    parser = argparse.ArgumentParser(description="Serve the ./public directory.")
    parser.add_argument("--host", default=os.environ.get("HOST", "127.0.0.1"))
    parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", 8000)))
    args = parser.parse_args()

    with ThreadingHTTPServer((args.host, args.port), Handler) as httpd:
        print(f"Serving {PUBLIC_DIR} on http://{args.host}:{args.port}  (Ctrl+C to stop)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down.")


if __name__ == "__main__":
    main()
