#!/usr/bin/env python3
"""Syntax guard for the source files.

A JavaScript syntax error in a data file makes the whole page fail to
render — a blank site with no visible clue. This walks each JS file
character by character, tracking string and comment context so that
brackets inside text are ignored, and reports any imbalance with the
line where it went wrong.

Run standalone, or let build.py call it before writing anything.
"""

import io
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))

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

CSS = [
    "src/styles/tokens.css",
    "src/styles/base.css",
    "src/styles/layout.css",
    "src/styles/components.css",
]

PAIRS = {")": "(", "]": "[", "}": "{"}
OPENERS = set("([{")


def scan(text, is_css=False):
    """Return (errors, depth) after ignoring strings, comments and regexes."""
    errors = []
    stack = []
    i = 0
    line = 1
    n = len(text)

    while i < n:
        c = text[i]

        if c == "\n":
            line += 1
            i += 1
            continue

        # comments
        if c == "/" and i + 1 < n:
            if text[i + 1] == "/" and not is_css:
                while i < n and text[i] != "\n":
                    i += 1
                continue
            if text[i + 1] == "*":
                j = text.find("*/", i + 2)
                if j == -1:
                    errors.append((line, "unterminated block comment"))
                    break
                line += text.count("\n", i, j)
                i = j + 2
                continue

        # strings
        if c in "\"'`":
            quote = c
            i += 1
            while i < n:
                if text[i] == "\\":
                    i += 2
                    continue
                if text[i] == "\n" and quote != "`":
                    errors.append((line, "unterminated string"))
                    break
                if text[i] == "\n":
                    line += 1
                if text[i] == quote:
                    i += 1
                    break
                i += 1
            continue

        # regex literals: a '/' in a value position starts one, and the
        # quotes inside its character class are not string delimiters
        if c == "/" and not is_css:
            k = i - 1
            while k >= 0 and text[k] in " 	":
                k -= 1
            prev = text[k] if k >= 0 else ""
            if prev in "(,=:[!&|?{};" or prev == "":
                i += 1
                in_class = False
                while i < n:
                    ch = text[i]
                    if ch == "\\":
                        i += 2
                        continue
                    if ch == "\n":
                        break
                    if ch == "[":
                        in_class = True
                    elif ch == "]":
                        in_class = False
                    elif ch == "/" and not in_class:
                        i += 1
                        break
                    i += 1
                while i < n and text[i] in "gimsuyd":
                    i += 1
                continue

        if c in OPENERS:
            stack.append((c, line))
        elif c in PAIRS:
            if not stack:
                errors.append((line, "unexpected closing '%s'" % c))
            elif stack[-1][0] != PAIRS[c]:
                errors.append((line, "'%s' closes '%s' opened on line %d"
                               % (c, stack[-1][0], stack[-1][1])))
                stack.pop()
            else:
                stack.pop()
        i += 1

    for ch, ln in stack:
        errors.append((ln, "'%s' opened here was never closed" % ch))
    return errors


def main():
    bad = 0
    for rel in JS + CSS:
        path = os.path.join(ROOT, rel)
        if not os.path.exists(path):
            print("MISSING  %s" % rel)
            bad += 1
            continue
        text = io.open(path, encoding="utf-8").read()
        errors = scan(text, is_css=rel.endswith(".css"))
        if errors:
            bad += 1
            print("FAIL     %s" % rel)
            for ln, msg in errors[:6]:
                print("           line %d: %s" % (ln, msg))
        else:
            print("ok       %s" % rel)

    if bad:
        print("\n%d file(s) failed — do NOT publish." % bad)
        return 1
    print("\nall files balanced.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
