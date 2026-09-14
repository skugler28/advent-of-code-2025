function solvePart2(lines) {
    const amountNumbers = 12
    let result = 0;

    for (const line of lines) {
        console.log("solve line", line)
        let highestPossibleValue = ""
        let puffer = amountNumbers - 1
        let lost = 0

        // die letzten 12 werte wegnehmen und die höchste nummer suchen, dann danach die letzen 11 wegnehmen die höchste nummer suchen, dann die letzen 10 und bis zum ende
        for (let numberNr = 0; numberNr < amountNumbers; numberNr++) {
            console.log("call now with", Number(line.slice(lost, puffer > 0 ? -puffer : line.length)), "lost:", lost, "puffer:", puffer)
            const { value, index } = getHighest(line.slice(lost, puffer > 0 ? -puffer : line.length))
            console.log(value, index + lost)
            highestPossibleValue += String(value)
            lost = lost + index + 1
            puffer--
        }

        console.log("result:", highestPossibleValue, "\n")
        result += Number(highestPossibleValue)

    }

    return result

}

function getHighest(string) {
    let value = -1;
    let index = -1;
    for (let i = 0; i < string.length; i++) {
        const digit = Number(string[i])
        if (digit > value) {
            value = digit
            index = i
        }
    }
    return { value, index }
}

module.exports = solvePart2;
