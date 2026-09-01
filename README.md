# adversarian.github.io

Personal page, plus **Notes** — write-ups of things I wanted to understand
properly, worked all the way down with figures that compute themselves in the
browser rather than being drawn by hand.

Live at <https://adversarian.github.io>.

## Layout

```
index.html                          landing page + notes index
css/style.css                       shared design tokens (palette, type)
js/demo.js                          particle field + theme switching
js/jquery.particleground.js         vendored, unmodified
notes/<slug>/index.html             one self-contained note per directory
```

Each note is a single standalone HTML file: its own styles, its own scripts,
no build step. Drop a directory under `notes/` and add a row to the index.

## Theme

Light and dark are driven by three states, in this order of precedence:

1. an explicit choice, stored in `localStorage` and stamped as
   `data-theme="light" | "dark"` on `<html>` before first paint,
2. otherwise `prefers-color-scheme`,
3. otherwise light.

Every colour is a CSS custom property defined on bare `:root` and redefined in
both the media query and the `[data-theme]` block, so no colour is ever left
undefined in one of the three states. The particle field reads the resolved
theme and repaints, since particleground fixes its colours at init.

## Running it locally

No build, no dependencies:

```
python3 -m http.server 8000
```

## Credits

The particle background uses [particleground](https://github.com/jnicol/particleground)
by Jonathan Nicol, vendored unmodified. The original landing page was built
from [ParticleGround-Portfolio](https://github.com/itsron717/ParticleGround-Portfolio);
see `LICENSE`. Maths on the notes pages is typeset with
[KaTeX](https://katex.org/).
