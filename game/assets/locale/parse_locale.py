#!/usr/bin/env python3
"""
parse_locale.py

Usage:
  python parse_locale.py path/to/eng.txt

Description:
  Reads an input plaintext locale file in the original Citadel format and writes a JSON file next to it with the same base
  name but .json extension. Parsing rules:
    - Lines starting with '@' begin a new section. The first such section is id 0, next is 1, etc.
    - Stop parsing when a line starts with '@@'. That terminates parsing and the rest is ignored.
    - Lines not starting with '@' (and not blank) are appended as strings to the current section's array.
    - Blank lines are ignored.

Output JSON format: { "0": ["line1", ...], "1": [...], ... }

This script validates the produced JSON by loading it back.
"""

import sys
import json
from pathlib import Path

def parse_locale_file(input_path: Path):
    sections = []
    current = None

    with input_path.open('r', encoding='utf-8', errors='replace') as f:
        for raw_line in f:
            line = raw_line.rstrip('\n')
            if not line:
                # skip blank lines
                continue

            if line.startswith('@@'):
                # termination marker
                break

            if line.startswith('@'):
                # start new section
                sections.append([])
                current = sections[-1]
                # if the line has more after '@' (rare), include it as first option
                rest = line[1:]
                if rest:
                    current.append(rest)
                continue

            # regular option line
            if current is None:
                # ignore lines before the first '@'
                continue
            current.append(line)

    # build mapping with numeric string keys starting at 0
    mapping = {str(i): sections[i] for i in range(len(sections))}
    return mapping


def main(argv):
    if len(argv) < 2:
        print('Usage: python parse_locale.py path/to/eng.txt')
        return 2

    input_path = Path(argv[1])
    if not input_path.exists():
        print(f'Input file does not exist: {input_path}')
        return 2

    out_path = input_path.with_suffix('.json')

    mapping = parse_locale_file(input_path)

    # write atomically: write to a temp file, then rename
    tmp = out_path.with_suffix(out_path.suffix + '.tmp')
    with tmp.open('w', encoding='utf-8') as f:
        json.dump(mapping, f, ensure_ascii=False, indent=2)
        f.write('\n')

    tmp.replace(out_path)

    # validate by reloading
    try:
        with out_path.open('r', encoding='utf-8') as f:
            loaded = json.load(f)
    except Exception as e:
        print('ERROR: wrote file but failed to parse it back:', e)
        return 1

    print(f'Wrote {out_path} ({len(mapping)} sections)')
    return 0

if __name__ == '__main__':
    raise SystemExit(main(sys.argv))
