function solvePart1(lines) {

    const max = 99;

    let processValue = 50;
    let result = 0;


    for (const line of lines) {
        const direction = line[0];
        const value = Number(line.slice(1)) % (max + 1)

        direction == "R" ? processValue += value : processValue -= value;

        if (processValue > max) processValue -= max + 1;
        if (processValue < 0) processValue += max + 1;

        if (processValue == 0) result++;
        // console.log("action:", line, "value:", value, "=> current:", processValue, )
    }

    return result;
}

module.exports = solvePart1;
