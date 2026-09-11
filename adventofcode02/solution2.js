function solvePart2(lines) {
    let result = 0;

    const ranges = lines[0].split(",")

    for (const range of ranges) {
        console.log("Check range:", range)


        let start = Number(range.match(/^\d+/)[0])
        const end = Number(range.match(/-\d+/)[0].slice(1)) // remove trailing /-/ ahhhhh regex cause wth is that: /(?<=-)\d+/

        // nimm immer eine neue zahl hinzu und schaue ob der slug den rest der zahl ausmacht

        while (Number(start) != Number(end) + 1) {

            if (start == 1188511885) {
                console.log()
            }

            const str = String(start)
            const totalLength = str.length
            let slug = str[0]

            // dann nochmals mit grenzen eines weiter oder wenn gesamtlänge erreich dann finito
            if (stillMatching(str, slug, slug.length, slug.length * 2, totalLength)) {
                result += start
                console.log("found invalid Id:", start)
            }
            start++
        }

    }

    return result;
}

function stillMatching(str, slug, startIdx, endIdx, length) {
    // wenn es sich nicht mehr ausgeht oder der slug undgrade enden würde dann scheitern
    if (endIdx > length || slug.length > length - slug.length) return false

    // wenn der nächste block gleich lang wie slug mit slug übereinstimmt dann den nächsten block checken
    if (slug == str.slice(startIdx, endIdx)) {
        // wenn schon am ende angekommen dann stimmt alles
        if (endIdx == length) return true
        return stillMatching(str, slug, startIdx + slug.length, endIdx + slug.length, length)
    }

    slug = slug + str[slug.length]
    return stillMatching(str, slug, slug.length, slug.length * 2, length)

}

module.exports = solvePart2;
