#!/usr/bin/env python3
"""Bundle the site into one self-contained HTML file.

The multi-file source in src/ is what you work in; this flattens it
for anywhere that can only take a single file. All Thmanyah faces
become data URIs, so the bundle needs no server and makes no network
request at all.

    python build.py

Outputs:
    dist/portfolio-artifact.html       fragment for the Artifact viewer
    dist/Maha-Alrashdi-Portfolio.html  standalone, openable from disk
"""

import base64
import io
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))

CSS = [
    "src/styles/tokens.css",
    "src/styles/base.css",
    "src/styles/layout.css",
    "src/styles/components.css",
]

JS = [
    "src/js/data.shared.js",
    "src/js/data.en.js",
    "src/js/data.projects.en.js",
    "src/js/data.ar.js",
    "src/js/data.projects.ar.js",
    "src/js/field.js",
    "src/js/ui.js",
    "src/js/render.js",
    "src/js/render.project.js",
    "src/js/app.js",
]

TITLE = "Inside Maha's World"
DESCRIPTION = ("An interactive portfolio prototype for Maha Alrashdi — "
               "engineer, creator, problem solver.")

#: The standalone file is opened straight from disk, so it carries the
#: whole document. The charset declaration is not optional: without it
#: a browser reading a local file guesses the encoding and every Arabic
#: character comes out as mojibake.
STANDALONE = """<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%(title)s</title>
<meta name="description" content="%(description)s">
<style>
:root { color-scheme: light dark; }
html, body { margin: 0; padding: 0; }
img { max-width: 100%%; }
%(css)s
</style>
</head>
<body>
%(body)s
<script>
%(js)s
</script>
</body>
</html>
"""


def read(rel):
    with io.open(os.path.join(ROOT, rel), encoding="utf-8") as f:
        return f.read()


def inline_fonts(css):
    seen = {}

    def sub(m):
        name = m.group(1)
        if name not in seen:
            with open(os.path.join(ROOT, "public", "fonts", name), "rb") as f:
                seen[name] = "data:font/woff2;base64," + \
                    base64.b64encode(f.read()).decode("ascii")
        return 'url("%s")' % seen[name]

    return re.sub(r'url\("\.\./\.\./public/fonts/([^"]+\.woff2)"\)', sub, css), len(seen)


def body_markup():
    html = read("index.html")
    m = re.search(r"<body>(.*?)</body>", html, re.S)
    if not m:
        raise SystemExit("could not find <body> in index.html")
    return re.sub(r'\s*<script src="[^"]+"></script>', "", m.group(1)).strip()


def main():
    # A JavaScript syntax error in a data file renders a blank page with
    # no visible clue, so refuse to build one.
    import check
    if check.main() != 0:
        raise SystemExit("build aborted: fix the syntax errors above")

    css, n_fonts = inline_fonts("\n".join(read(p) for p in CSS))
    js = "\n".join("/* ---- %s ---- */\n%s" % (os.path.basename(p), read(p)) for p in JS)
    body = body_markup()

    dist = os.path.join(ROOT, "dist")
    if not os.path.isdir(dist):
        os.makedirs(dist)

    # the Artifact platform supplies doctype/html/head/body itself
    fragment = "\n\n".join([
        "<title>%s</title>" % TITLE,
        "<style>\n%s\n</style>" % css,
        body,
        "<script>\n%s\n</script>" % js,
    ]) + "\n"

    a = os.path.join(dist, "portfolio-artifact.html")
    with io.open(a, "w", encoding="utf-8") as f:
        f.write(fragment)

    b = os.path.join(dist, "Maha-Alrashdi-Portfolio.html")
    with io.open(b, "w", encoding="utf-8") as f:
        f.write(STANDALONE % {
            "title": TITLE, "description": DESCRIPTION,
            "css": css, "body": body, "js": js,
        })

    for path, tag in ((a, "artifact fragment"), (b, "standalone")):
        print("wrote %-40s %-18s %.2f MB" % (
            os.path.relpath(path, ROOT), tag,
            os.path.getsize(path) / 1024.0 / 1024.0))
    print("  %d Thmanyah faces inlined" % n_fonts)
    if os.path.getsize(a) > 16 * 1024 * 1024:
        print("  WARNING: fragment is over the 16MB artifact limit")


if __name__ == "__main__":
    main()
