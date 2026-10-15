# Penguinoh Waddles

A photo gallery website for Penguinoh Waddles, a traveling stuffed penguin. Built with [Astro](https://astro.build).

## Development

```sh
npm install
npm run dev        # Start dev server at localhost:4321
npm run build      # Build for production to ./dist/
npm run preview    # Preview the production build locally
```

## Image Pipeline

Source images live in `src/assets/images/` and are pre-resized to max 1600px (quality 85, EXIF stripped) to keep the repo manageable. Astro generates optimized WebP thumbnails at build time for the gallery grid, and serves the full 1600px versions in the lightbox.

To add new photos, drop them into `src/assets/images/` and resize:

```sh
magick mogrify -resize "1600x1600>" -quality 85 -strip src/assets/images/NEW_IMAGE.jpeg
```

## Stamps and Daydreams

Every photo appears as a passport stamp. To give one a place name, add a row to the `labels`
list in `src/data/photos.ts`; labelled photos are shown first, in that order, and the rest follow by file name.

The Daydreams section shows AI-generated samples from the
[Penguinoh generator](https://huggingface.co/eigenben/penguinoh-flux2-klein-base-4b). Its images live in
`src/assets/daydreams/` and their prompts in `src/data/daydreams.ts`. Keep anything AI-generated out of
`src/assets/images/`: the site promises those are all real.
