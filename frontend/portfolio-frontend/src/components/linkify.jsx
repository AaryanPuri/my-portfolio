// Turns link-like substrings (full URLs, bare github.com/linkedin.com/x.com
// mentions, DOIs, email addresses, and Markdown-style [label](url) links)
// inside plain text into real clickable <a> elements. Used anywhere
// link-shaped text is rendered as a plain string rather than an actual
// anchor -- NOVA's chat replies (an LLM will sometimes format links as
// Markdown even though this UI renders plain text) and the CLI terminal's
// typed command output.

// Markdown links are matched FIRST and take priority over the plain-URL
// alternatives below -- otherwise a bare "github.com/..." alternative would
// greedily consume straight through a following "](https://...)" since none
// of those characters are in its exclusion set.
const LINK_REGEX =
    /\[([^[\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<>"'()[\]]+)|(\b(?:github|linkedin|x|twitter)\.com\/[^\s<>"'()[\]]+)|(\b10\.\d{4,9}\/[^\s<>"'()[\]]+)|([\w.+-]+@[\w-]+\.[a-zA-Z]{2,})|(@Aaryan_75\b)/g

const TRAILING_PUNCT = /[.,;:!?)]+$/

export function linkifyText(text) {
    if (!text) return text

    const regex = new RegExp(LINK_REGEX)
    const parts = []
    let lastIndex = 0
    let match
    let key = 0

    while ((match = regex.exec(text)) !== null) {
        const start = match.index
        const isMarkdownLink = match[1] !== undefined
        let consumedLength = match[0].length
        let displayText
        let href
        let isEmail = false

        if (isMarkdownLink) {
            displayText = match[1]
            href = match[2]
        } else {
            let raw = match[0]
            const trailing = raw.match(TRAILING_PUNCT)
            if (trailing) raw = raw.slice(0, raw.length - trailing[0].length)
            if (!raw) continue
            consumedLength = raw.length
            displayText = raw
            isEmail = Boolean(match[6])
            if (isEmail) href = `mailto:${raw}`
            else if (match[5]) href = `https://doi.org/${raw}`
            else if (match[4]) href = `https://${raw}`
            else if (match[7]) href = `https://x.com/${raw.slice(1)}`
            else href = raw
        }

        if (start > lastIndex) parts.push(text.slice(lastIndex, start))

        parts.push(
            <a
                key={key++}
                href={href}
                target={isEmail ? undefined : '_blank'}
                rel={isEmail ? undefined : 'noopener noreferrer'}
                className="linkified-link"
                onClick={(e) => e.stopPropagation()}
            >
                {displayText}
            </a>
        )

        lastIndex = start + consumedLength
    }

    if (lastIndex < text.length) parts.push(text.slice(lastIndex))
    return parts.length ? parts : text
}
