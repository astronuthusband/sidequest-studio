# Sidequest Studio — Website

A one-page site built from the Figma design.

## Files
- `index.html` — all page content/sections
- `style.css` — all styling
- `script.js` — mobile menu, scroll-highlight on the services list, image upload previews

## How to view it
Just open `index.html` in a browser. No build step, no dependencies — pure HTML/CSS/JS.

If you want to run it through a local server instead (recommended once you start
adding real images), from this folder run:

```
python3 -m http.server 8000
```

then visit http://localhost:8000

## Things left as placeholders (as requested)
- The two founder photos under "Two Kids Who Hate Boring Websites" — click either
  placeholder to preview-upload an image locally. Swap in real asset paths in
  `index.html` when ready.
- The 5 "Artwork Mock Up" boxes — same click-to-preview behavior. Replace with
  real exported images from Figma.

## The scroll-highlight effect
The Website Design / Digital Marketing / Branding / Social Media list uses an
IntersectionObserver (in `script.js`) to flip the row nearest the center of the
viewport to a white background as you scroll up or down — matches the effect
in your Figma reference.

## Fonts
Google Fonts: Space Grotesk (body/headlines) + Permanent Marker (the
handwritten accents — logo "Studio.", "Two kids who hate boring websites",
"Meet./Scope./Start.", "No middlemen."). Loaded via CDN link in `index.html`,
no local font files needed.
