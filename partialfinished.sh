#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

latest_day() {
    local highest=0 folder name candidate
    shopt -s nullglob
    for folder in "$script_dir"/adventofcode[0-9][0-9]; do
        name="${folder##*/}"
        candidate=$((10#${name#adventofcode}))
        ((candidate > highest)) && highest=$candidate
    done
    shopt -u nullglob
    echo "$highest"
}

if (($# > 1)); then
    echo "Verwendung: $0 [Tag]" >&2
    exit 1
fi

if (($# == 1)); then
    [[ $1 =~ ^[0-9]+$ ]] || { echo "Der Tag muss eine Zahl sein." >&2; exit 1; }
    day=$((10#$1))
elif [[ "$(date +%m)" == "12" ]] && ((10#$(date +%d) <= 25)); then
    day=$((10#$(date +%d)))
else
    day="$(latest_day)"
fi

((day >= 1 && day <= 25)) || { echo "Kein gueltiger AoC-Tag gefunden." >&2; exit 1; }
printf -v padded_day '%02d' "$day"
folder_name="adventofcode$padded_day"
[[ -d "$script_dir/$folder_name" ]] || { echo "Der Ordner '$folder_name' existiert nicht." >&2; exit 1; }

git -C "$script_dir" add -- "$folder_name"
git -C "$script_dir" commit -m "partial working - day $padded_day"
git -C "$script_dir" push
echo "Zwischenstand fuer AoC-Tag $padded_day wurde gepusht."
