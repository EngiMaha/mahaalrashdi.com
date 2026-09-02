#!/usr/bin/env python3
"""Render tools/og-template.html to public/og.png.

That PNG is what LinkedIn, WhatsApp and X show when the site is
shared. Run it after editing the template:

    python tools/make-og.py
"""

import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE = os.path.join(ROOT, "tools", "og-template.html")
OUT = os.path.join(ROOT, "public", "og.png")

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


def main():
    subprocess.run([
        browser(),
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--allow-file-access-from-files",
        "--force-device-scale-factor=1",
        "--window-size=1200,630",
        "--virtual-time-budget=5000",
        "--screenshot=" + OUT,
        "file:///" + TEMPLATE.replace("\\", "/"),
    ], check=True, capture_output=True)

    if not os.path.exists(OUT):
        sys.exit("render produced no file")
    print("wrote %s  %.0f KB" % (
        os.path.relpath(OUT, ROOT), os.path.getsize(OUT) / 1024.0))


if __name__ == "__main__":
    main()
