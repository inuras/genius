# GENIUS site

A separate small site with only the GENIUS pages: **Cours et exercices** (lectures) and **Ressources**.
Python standard library only, nothing to install.

## Run

```sh
cd ~/genius/genius-site
python3 server.py                   # http://127.0.0.1:8001
python3 server.py --host 0.0.0.0    # also reachable from other devices on your Wi-Fi
```

It uses port **8001**, so it can run at the same time as the main site (port 8000).
To share it on the internet: `cloudflared tunnel --url http://localhost:8001`.

## Edit

- Lectures: `public/index.html` (one `<li class="chap">` per chapter). Put the PDFs in `public/files/`.
- Resources: `public/ressources.html` (one `<li class="res">` per site).
- Text in English and French: `public/i18n.js` (every key must exist in both `en` and `fr`).
