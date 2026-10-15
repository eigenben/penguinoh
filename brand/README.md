# Favicon and link preview card

## Favicon

`face.png` is Penguinoh's head cut out of `src/assets/images/IMG_7256.jpeg` (the
Eiffel Tower close-up): the sky was flood-filled away and the neck trimmed with a
circle. Every icon in `public/` is made from it. From the repository root:

```bash
for s in 16 32 48; do magick brand/face.png -filter Lanczos -resize ${s}x${s} -unsharp 0x0.6+0.6+0 /tmp/favicon-$s.png; done
magick /tmp/favicon-16.png /tmp/favicon-32.png /tmp/favicon-48.png public/favicon.ico
magick brand/face.png -filter Lanczos -resize 192x192 -unsharp 0x0.8 -strip public/favicon.png
magick -size 180x180 xc:'#F3EEE2' \( brand/face.png -filter Lanczos -resize 148x148 -unsharp 0x0.8 \) -gravity center -composite -strip public/apple-touch-icon.png
```

The apple touch icon sits on the site's paper colour because iOS fills
transparency with black.

## Link preview card

`og.html` renders `public/og.jpg`, the 1200×630 Open Graph image that iMessage,
Slack and the like show when a link to the site is shared. The layout points every
page's `og:image` at it.

The template uses `face.png` and the Eiffel Tower photo from `src/assets/images`,
so it must be served with the repository root as the web root:

```bash
python3 -m http.server 8799 --bind 127.0.0.1 &
npx --yes playwright screenshot --channel=chrome --viewport-size=1200,630 --wait-for-timeout=1500 http://127.0.0.1:8799/brand/og.html /tmp/og.png
kill %1
magick /tmp/og.png -strip -sampling-factor 4:4:4 -quality 88 public/og.jpg
```

`--channel=chrome` uses the installed Google Chrome, so no Playwright browser
download is needed. It is saved as a JPEG because the photo and the guilloche
make a PNG over 500 KB; keep it exactly 1200×630 and under about 300 KB.
