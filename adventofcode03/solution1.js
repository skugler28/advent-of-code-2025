function solvePart1(lines) {
    // this one is weirdly easy? i am suspicious of part 2

    let result = 0;

    for (const line of lines) {
        let max = 9;
        let restIndex = 0;
        let maxNumber = "";
        let reverse = false;

        while (maxNumber.length < 2) {
            for (let i = restIndex; i < line.length; i++) {
                if (line[i] == max) {
                    if (i == line.length - 1 && maxNumber.length == 0) {
                        reverse = true
                    }

                    reverse ? maxNumber = line[i] + maxNumber : maxNumber += line[i]
                    reverse ? restIndex = 0 : restIndex = i

                    if (maxNumber.length >= 2) {
                        break;
                    }
                }
            }
            max--
            if (max < 0) break

        }
        result += Number(maxNumber)
    }

    return result

}

module.exports = solvePart1;
