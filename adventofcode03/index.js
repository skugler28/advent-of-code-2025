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
