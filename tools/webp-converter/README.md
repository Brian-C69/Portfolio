# WebP Converter

Convert `.png`, `.jpg`, `.jpeg` images to `.webp` (batch + recursive).

## Setup

```bash
cd C:\xampp\htdocs\portfolio\tools\webp-converter
npm install
```

## Usage

Convert everything in a folder (writes `.webp` next to originals):

```bash
npm run convert -- "C:\path\to\images"
```

Convert specific files:

```bash
npm run convert -- a.png b.jpg
```

Write outputs to a separate folder (keeps relative paths per input root):

```bash
npm run convert -- "C:\path\images" --out-dir "C:\path\webp"
```

Common options:

- `--quality 1..100` (lossy WebP quality; default `82`)
- `--effort 0..6` (encode effort; default `4`)
- `--png-mode lossless|near-lossless|lossy` (default `lossless`)
- `--near-lossless 0..100` (only for `--png-mode near-lossless`; default `60`)
- `--name-mode simple|preserve-ext` (default `simple`; use `preserve-ext` to avoid name collisions like `a.jpg` + `a.png`)
- `--overwrite` (replace existing `.webp`)
- `--delete-original` (dangerous; only after successful encode)
- `--dry-run`

## Notes

- This is *client-side conversion* (click-to-chat / static site friendly). If you want WhatsApp Business Cloud API automation, that needs a backend and credentials.
