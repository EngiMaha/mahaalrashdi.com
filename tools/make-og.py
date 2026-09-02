#!/usr/bin/env python3
"""Render the share cards in tools/ to PNGs in public/.

og.png is what LinkedIn, WhatsApp and X show when the link is shared.
promo.png and invite.png are square cards to post by hand. Run
after editing any template:

    python tools/make-og.py
"""

import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#: (template, output, width, height) — the link preview card the
#: platforms fetch, and the square promo card to post by hand.
CARDS = [
    ("og-template.html",    "og.png",    1200,  630),
    ("promo-template.html", "promo.png", 1200, 1200),
    ("invite-template.html", "invite.png", 1200, 1200),
]

#: Any Chromium will do; these are the usual Windows and Linux homes.
BROWSERS = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "/usr/bin/chromium",
    "/usr/bin/google-chrome",
]


def browser():
    for b in BROWSERS:
        if os.path.exists(b):
            return b
    sys.exit("no Chromium-based browser found; add yours to BROWSERS")


def render(exe, template, out, width, height):
    src = os.path.join(ROOT, "tools", template)
    dst = os.path.join(ROOT, "public", out)
    subprocess.run([
        exe,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--allow-file-access-from-files",
        "--force-device-scale-factor=1",
        "--window-size=%d,%d" % (width, height),
        "--virtual-time-budget=5000",
        "--screenshot=" + dst,
        "file:///" + src.replace("\\", "/"),
    ], check=True, capture_output=True)

    if not os.path.exists(dst):
        sys.exit("render produced no file for " + template)
    print("wrote %-18s %5.0f KB  %dx%d" % (
        os.path.relpath(dst, ROOT), os.path.getsize(dst) / 1024.0, width, height))


def main():
    exe = browser()
    for template, out, w, h in CARDS:
        render(exe, template, out, w, h)


if __name__ == "__main__":
    main()
