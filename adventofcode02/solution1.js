function solvePart1(lines) {
    let result = 0;

    const ranges = lines[0].split(",")


    for (const range of ranges) {
        // console.log("Check range:", range)

        // console.log(range.match(/^\d+/)[0], range.match(/-\d+/)[0].slice(1))

        let start = Number(range.match(/^\d+/)[0])
        const end = Number(range.match(/-\d+/)[0].slice(1)) // remove trailing /-/ ahhhhh regex cause wth is that: /(?<=-)\d+/

        while (Number(start) != Number(end) + 1) {
            const split = String(start).length / 2
            if (split != Math.floor(split)) {
                start++
                continue
            }

            // console.log(split, start, String(start).slice(0, split), String(start).slice(-split))

            if (String(start).slice(0, split) == String(start).slice(-split)) {
                // console.log("invalid found:", start)
                result += start
            }
            start++
        }

    }


    return result;
}

module.exports = solvePart1;
