import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { COMMANDS, FILESYSTEM, SHORTCUTS, HELP_TEXT, formatPrompt, getUnknownCommandOutput } from './terminalContent'
import { linkifyText } from './linkify'
import './AITerminal.css'

function splitHeading(text) {
    const idx = text.indexOf('\n')
    if (idx === -1) return { heading: text, body: '' }
    // keep the leading newline in `body` (rather than re-adding one when
    // rendering) so a blank line in the source shows up exactly once, not
    // duplicated
    return { heading: text.slice(0, idx), body: text.slice(idx) }
}

function TypedText({ text, speed = 10, onDone, className, scrollRef }) {
    const [shown, setShown] = useState('')

    useEffect(() => {
        let i = 0
        let cancelled = false
        const step = () => {
            if (cancelled) return
            i += 1
            setShown(text.slice(0, i))
            if (scrollRef?.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
            if (i < text.length) {
                timeoutId = setTimeout(step, speed)
            } else if (onDone) {
                onDone()
            }
        }
        let timeoutId = setTimeout(step, speed)
        return () => {
            cancelled = true
            clearTimeout(timeoutId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!text) return null

    const isDone = shown.length === text.length
    const { heading, body } = splitHeading(shown)

    return (
        <div className={className}>
            <span className="term-output-heading">{linkifyText(heading)}</span>
            {body && <span className="term-output-body">{linkifyText(body)}</span>}
            {!isDone && <span className="term-cursor" />}
        </div>
    )
}

function CommandEntry({ prompt, command, output, scrollRef }) {
    return (
        <div className="term-entry">
            <div className="term-line-input">
                <span className="term-prompt">{prompt}</span>
                <span>{command}</span>
            </div>
            {output && <TypedText text={output} scrollRef={scrollRef} />}
        </div>
    )
}

function resolveDir(cwd) {
    let node = { type: 'dir', children: FILESYSTEM }
    for (const segment of cwd) {
        const next = node.children?.[segment]
        if (!next || next.type !== 'dir') return null
        node = next
    }
    return node
}

function listDir(dirNode) {
    return Object.entries(dirNode.children)
        .map(([name, node]) => (node.type === 'dir' ? `${name}/` : name))
        .join('   ')
}

// shared by both the live ghost-text preview and the Tab handler, so the
// hint shown to the user always matches what Tab will actually do
function getCompletionMatches(input, cwd) {
    const parts = input.split(/\s+/)
    const isArgPosition = parts.length > 1 && ['cd', 'cat', 'ls'].includes(parts[0].toLowerCase())

    if (isArgPosition) {
        const partial = parts[parts.length - 1].toLowerCase()
        const dirNode = resolveDir(cwd)
        if (!dirNode) return { isArgPosition, partial, matches: [] }
        const cmdName = parts[0].toLowerCase()
        const names = Object.entries(dirNode.children)
            .filter(([, node]) => (cmdName === 'cd' ? node.type === 'dir' : true))
            .map(([name]) => name)
        return { isArgPosition, parts, partial, matches: names.filter((n) => n.startsWith(partial)) }
    }

    const prefix = input.trim().toLowerCase()
    if (!prefix) return { isArgPosition, partial: '', matches: [] }
    return { isArgPosition, parts, partial: prefix, matches: COMMANDS.filter((c) => c.startsWith(prefix)) }
}

function AITerminal({ open, onClose }) {
    const [cwd, setCwd] = useState([])
    const [entries, setEntries] = useState([])
    const [input, setInput] = useState('')
    const [history, setHistory] = useState([])
    const [historyIndex, setHistoryIndex] = useState(0)
    const [closing, setClosing] = useState(false)

    const scrollRef = useRef(null)
    const inputRef = useRef(null)
    const entryIdRef = useRef(0)

    useEffect(() => {
        if (!open) return
        setCwd([])
        setEntries([])
        setInput('')
        setHistory([])
        setHistoryIndex(0)
        setClosing(false)
    }, [open])

    useEffect(() => {
        if (open && inputRef.current) inputRef.current.focus()
    }, [open])

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }, [entries])

    useEffect(() => {
        if (!open) return undefined
        function handleKeyDown(e) {
            if (e.key === 'Escape') requestClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    function requestClose() {
        setClosing(true)
        setTimeout(() => {
            onClose()
        }, 220)
    }

    function pushEntry(promptStr, command, output) {
        entryIdRef.current += 1
        setEntries((prev) => [...prev, { id: entryIdRef.current, prompt: promptStr, command, output }])
    }

    function downloadResume() {
        const link = document.createElement('a')
        link.href = '/resume.pdf'
        link.download = 'Aaryan_Puri_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    function runCommand(raw) {
        const trimmed = raw.trim()
        if (!trimmed) return

        const promptStr = formatPrompt(cwd)
        setHistory((prev) => [...prev, raw])
        setHistoryIndex((prev) => prev + 1)

        const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/)
        const arg = args.join(' ')

        if (cmd === 'clear') {
            setEntries([])
            return
        }

        if (cmd === 'help') {
            pushEntry(promptStr, raw, HELP_TEXT)
            return
        }

        if (cmd === 'pwd') {
            pushEntry(promptStr, raw, cwd.length === 0 ? '~' : `~/${cwd.join('/')}`)
            return
        }

        if (cmd === 'ls') {
            const target = arg ? resolveDir([...cwd, arg]) : resolveDir(cwd)
            if (!target) {
                pushEntry(promptStr, raw, `ls: cannot access '${arg}': No such directory`)
            } else {
                pushEntry(promptStr, raw, listDir(target))
            }
            return
        }

        if (cmd === 'cd') {
            if (!arg || arg === '~' || arg === '/') {
                setCwd([])
                pushEntry(promptStr, raw, '')
                return
            }
            if (arg === '..') {
                setCwd((prev) => prev.slice(0, -1))
                pushEntry(promptStr, raw, '')
                return
            }
            const dirNode = resolveDir(cwd)
            const target = dirNode?.children?.[arg]
            if (target && target.type === 'dir') {
                setCwd((prev) => [...prev, arg])
                pushEntry(promptStr, raw, '')
            } else if (target) {
                pushEntry(promptStr, raw, `cd: not a directory: ${arg}`)
            } else {
                pushEntry(promptStr, raw, `cd: no such directory: ${arg}`)
            }
            return
        }

        if (cmd === 'cat') {
            if (!arg) {
                pushEntry(promptStr, raw, 'cat: missing file operand')
                return
            }
            const dirNode = resolveDir(cwd)
            const target = dirNode?.children?.[arg]
            if (!target) {
                pushEntry(promptStr, raw, `cat: ${arg}: No such file or directory`)
            } else if (target.type === 'dir') {
                pushEntry(promptStr, raw, `cat: ${arg}: Is a directory`)
            } else if (target.download) {
                downloadResume()
                pushEntry(promptStr, raw, 'Downloading resume.pdf...\nDownload started -- Aaryan_Puri_Resume.pdf')
            } else {
                pushEntry(promptStr, raw, target.content)
            }
            return
        }

        if (cmd === 'resume') {
            downloadResume()
            pushEntry(promptStr, raw, 'Preparing resume...\nDownload started -- Aaryan_Puri_Resume.pdf')
            return
        }

        if (SHORTCUTS[cmd]) {
            pushEntry(promptStr, raw, SHORTCUTS[cmd])
            return
        }

        pushEntry(promptStr, raw, getUnknownCommandOutput(cmd))
    }

    function handleSubmit(e) {
        e.preventDefault()
        runCommand(input)
        setInput('')
    }

    function handleKeyDown(e) {
        if (e.key === 'Tab') {
            e.preventDefault()
            e.stopPropagation()
            const { isArgPosition, parts, partial, matches } = getCompletionMatches(input, cwd)
            if (!partial) return

            if (matches.length === 1) {
                setInput(isArgPosition ? [...parts.slice(0, -1), matches[0]].join(' ') : matches[0])
            } else if (matches.length > 1) {
                pushEntry(formatPrompt(cwd), input, matches.join('   '))
            }
            return
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (history.length === 0) return
            const idx = Math.max(0, historyIndex - 1)
            setHistoryIndex(idx)
            setInput(history[idx] || '')
            return
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (history.length === 0) return
            const idx = historyIndex + 1
            if (idx >= history.length) {
                setHistoryIndex(history.length)
                setInput('')
            } else {
                setHistoryIndex(idx)
                setInput(history[idx])
            }
        }
    }

    const completion = getCompletionMatches(input, cwd)
    const singleMatch = completion.matches.length === 1 ? completion.matches[0] : ''
    const ghostFullText = singleMatch
        ? completion.isArgPosition
            ? [...completion.parts.slice(0, -1), singleMatch].join(' ')
            : singleMatch
        : ''

    const livePrompt = formatPrompt(cwd)

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="cli-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: closing ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) requestClose()
                    }}
                >
                    <motion.div
                        className="cli-window"
                        initial={{ opacity: 0, scale: 0.95, y: 16 }}
                        animate={{ opacity: closing ? 0 : 1, scale: closing ? 0.97 : 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 10 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="cli-header">
                            <div className="cli-topbar">
                                <div className="cli-dots">
                                    <span className="cli-dot cli-dot-red" />
                                    <span className="cli-dot cli-dot-yellow" />
                                    <span className="cli-dot cli-dot-blue" />
                                </div>
                                <span className="cli-topbar-title">CLI Portfolio</span>
                                <button type="button" className="cli-close-btn" onClick={requestClose} aria-label="Close">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="m5 5 14 14M19 5 5 19" />
                                    </svg>
                                </button>
                            </div>

                            <div className="cli-logo" aria-label="Aaryan">
                                {'AARYAN'.split('').map((ch, i) => (
                                    <span key={i} className="cli-logo-letter">
                                        {ch}
                                    </span>
                                ))}
                            </div>

                            <div className="cli-welcome">
                                <p className="cli-welcome-line">Welcome to my CLI Portfolio! 👋</p>
                                <p className="cli-welcome-sub">
                                    Type <strong>help</strong> to see available commands or explore the filesystem.
                                </p>
                            </div>
                        </div>

                        <div className="cli-scroll" ref={scrollRef} data-lenis-prevent onMouseDown={() => inputRef.current?.focus()}>
                            {entries.map((entry) => (
                                <CommandEntry
                                    key={entry.id}
                                    prompt={entry.prompt}
                                    command={entry.command}
                                    output={entry.output}
                                    scrollRef={scrollRef}
                                />
                            ))}

                            <form className="cli-prompt-row" onSubmit={handleSubmit}>
                                <span className="term-prompt">{livePrompt}</span>
                                <div className="cli-input-wrap">
                                    <span className="cli-ghost">
                                        {input && ghostFullText.startsWith(input) ? ghostFullText : ''}
                                    </span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className="cli-input"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        spellCheck="false"
                                        placeholder="Type command here..."
                                        aria-label="Terminal command input"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="cli-hint-bar">
                            <span>💡 Use arrow keys to navigate history · Tab for autocompletion · Esc to exit</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AITerminal
