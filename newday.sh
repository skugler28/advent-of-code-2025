#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

next_free_day() {
    local highest=0 folder name candidate
    shopt -s nullglob
    for folder in "$script_dir"/adventofcode[0-9][0-9]; do
        name="${folder##*/}"
        candidate=$((10#${name#adventofcode}))
        ((candidate > highest)) && highest=$candidate
    done
    shopt -u nullglob
    echo $((highest + 1))
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
    day="$(next_free_day)"
fi

((day >= 1 && day <= 25)) || { echo "Ungueltiger AoC-Tag: $day." >&2; exit 1; }

printf -v padded_day '%02d' "$day"
folder_name="adventofcode$padded_day"
folder_path="$script_dir/$folder_name"

[[ ! -e "$folder_path" ]] || { echo "Der Ordner '$folder_name' existiert bereits." >&2; exit 1; }

mkdir "$folder_path"
touch "$folder_path/input.txt" "$folder_path/test_input.txt"

cat > "$folder_path/index.js" <<'EOF'
const fs = require('node:fs');
const path = require('node:path');

const solvePart1 = require('./solution1');
const solvePart2 = require('./solution2');

const useTestInput = process.argv.includes('-test');
const inputFile = useTestInput ? 'test_input.txt' : 'input.txt';
const inputPath = path.join(__dirname, inputFile);
const input = fs.readFileSync(inputPath, 'utf8').replace(/\r\n?/g, '\n');
const lines = input === '' ? [] : input.replace(/\n$/, '').split('\n');

console.log(`Eingabe: ${inputFile}`);
console.log(`Teil 1: ${solvePart1(lines)}`);
console.log(`Teil 2: ${solvePart2(lines)}`);
EOF

cat > "$folder_path/solution1.js" <<'EOF'
function solvePart1(lines) {
    // TODO: Loesung fuer Teil 1
    return 'noch nicht geloest';
}

module.exports = solvePart1;
EOF

cat > "$folder_path/solution2.js" <<'EOF'
function solvePart2(lines) {
    // TODO: Loesung fuer Teil 2
    return 'noch nicht geloest';
}

module.exports = solvePart2;
EOF

echo "AoC-Tag $padded_day wurde in '$folder_name' angelegt."
echo "Test: node \"$folder_name/index.js\" -test"
echo "Echt: node \"$folder_name/index.js\""
