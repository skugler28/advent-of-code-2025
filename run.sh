#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

if (($# < 1 || $# > 2)); then
    echo "Verwendung: run <Tag> [-p]" >&2
    echo "  run 3    startet Tag 3 mit Testdaten" >&2
    echo "  run 8 -p  startet Tag 8 mit Produktivdaten" >&2
    exit 1
fi

[[ $1 =~ ^[0-9]+$ ]] || { echo "Der Tag muss eine Zahl sein." >&2; exit 1; }
day=$((10#$1))
((day >= 1 && day <= 25)) || { echo "Ungueltiger AoC-Tag: $day." >&2; exit 1; }

mode="${2:-test}"
if [[ "$mode" != "test" && "$mode" != "-p" ]]; then
    echo "Ungueltiger Modus '$mode'. Fuer Produktivdaten '-p' verwenden." >&2
    exit 1
fi

printf -v padded_day '%02d' "$day"
entrypoint="$script_dir/adventofcode${padded_day}/index.js"

[[ -f "$entrypoint" ]] || { echo "Nicht gefunden: adventofcode${padded_day}/index.js" >&2; exit 1; }

if [[ "$mode" == "-p" ]]; then
    node "$entrypoint"
else
    node "$entrypoint" -test
fi