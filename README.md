# genius

A minimal web page server using only the Python standard library.

## Run

```sh
python3 server.py            # http://127.0.0.1:8000
python3 server.py --port 3000 --host 0.0.0.0
```

- Static files are served from `public/` (`index.html` is the home page).
- `GET /api/health` returns a JSON status.
