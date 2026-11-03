#!/usr/bin/env python3
"""Minimal web page server (Python standard library only).

Serves static files from ./public and exposes a small JSON API.

Usage:
    python3 server.py [--host HOST] [--port PORT]
"""
import argparse
import json
import os
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PUBLIC_DIR = Path(__file__).resolve().parent / "public"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC_DIR), **kwargs)

    def do_GET(self):
        if self.path.split("?", 1)[0] == "/api/health":
            self._send_json({"status": "ok", "time": datetime.now(timezone.utc).isoformat()})
            return
        super().do_GET()

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
