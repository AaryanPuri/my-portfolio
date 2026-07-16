import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { linkifyText } from './linkify'
import './RobotAssistant.css'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const MESSAGES = ["Hi, I'm NOVA."]

function DownloadIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12" />
            <path d="M6.5 10.5 12 16l5.5-5.5" />
            <path d="M4 20h16" />
        </svg>
    )
}

function ProjectsIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3.5" y="6.5" width="17" height="13" rx="2" />
            <path d="M8 6.5V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" />
        </svg>
    )
}

function ExperienceIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h16" />
            <circle cx="12" cy="12" r="8.5" />
        </svg>
    )
}

function ContactIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
            <path d="m4.5 7 7.5 6 7.5-6" />
        </svg>
    )
}

function SkillsIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 19v-6" />
            <path d="M12 19V9" />
            <path d="M19 19V5" />
        </svg>
    )
}

function CertificationsIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8.5" r="5" />
            <path d="m9 13 -1.5 6.5L12 17l4.5 2.5L15 13" />
        </svg>
    )
}

function AchievementsIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
        </svg>
    )
}

function TestimonialsIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9c0-1.7 1.3-3 3-3v2c-.6 0-1 .4-1 1v1h1v4H6V9Z" />
            <path d="M14 9c0-1.7 1.3-3 3-3v2c-.6 0-1 .4-1 1v1h1v4h-3V9Z" />
        </svg>
    )
}

function ResearchIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 6c-1.5-1-3.5-1.5-5.5-1.5v13c2 0 4 .5 5.5 1.5" />
            <path d="M12 6c1.5-1 3.5-1.5 5.5-1.5v13c-2 0-4 .5-5.5 1.5" />
            <path d="M12 6v13" />
        </svg>
    )
}

function ChatIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5.5h16v11H9l-4 3.5v-3.5H4z" />
        </svg>
    )
}

function BackIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m14 6-6 6 6 6" />
        </svg>
    )
}

function SendIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 19.5 20 12 4.5 4.5 7 12l-2.5 7.5Z" />
        </svg>
    )
}

function CloseIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="m5 5 14 14M19 5 5 19" />
        </svg>
    )
}

function randomBetween(min, max) {
    return min + Math.random() * (max - min)
}

const GREETING = "Hi, I'm NOVA. Ask me about Aaryan's experience, projects, skills, or how to get in touch."

function RobotAssistant() {
    const rootRef = useRef(null)
    const buttonRef = useRef(null)
    const hoveredRef = useRef(false)
    const panelOpenRef = useRef(false)
    const chatBodyRef = useRef(null)
    const chatInputRef = useRef(null)
    const lenis = useLenis()

    const [hovered, setHovered] = useState(false)
    const [panelOpen, setPanelOpen] = useState(false)
    const [view, setView] = useState('menu')
    const [message, setMessage] = useState(null)

    const [chatMessages, setChatMessages] = useState([{ role: 'assistant', text: GREETING }])
    const [chatInput, setChatInput] = useState('')
    const [chatLoading, setChatLoading] = useState(false)

    const eyeXRaw = useMotionValue(0)
    const eyeX = useSpring(eyeXRaw, { stiffness: 140, damping: 16, mass: 0.5 })
    const headRotateRaw = useMotionValue(0)
    const headRotate = useSpring(headRotateRaw, { stiffness: 110, damping: 13, mass: 0.6 })
    const headYRaw = useMotionValue(0)
    const headY = useSpring(headYRaw, { stiffness: 130, damping: 15, mass: 0.5 })
    const blinkRaw = useMotionValue(1)
    const blinkScaleY = useSpring(blinkRaw, { stiffness: 420, damping: 24 })

    useEffect(() => {
        panelOpenRef.current = panelOpen
        if (!panelOpen) {
            // moves focus off whatever was focused (button, a panel item, the chat
            // input) so no lingering focus ring shows after a keyboard-triggered
            // close (e.g. Escape) -- a Tab-focused button should still show the
            // ring while open, but a closed panel never should
            if (rootRef.current?.contains(document.activeElement)) {
                document.activeElement.blur()
            }
            buttonRef.current?.blur()
            const t = setTimeout(() => setView('menu'), 300)
            return () => clearTimeout(t)
        }
        return undefined
    }, [panelOpen])

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
        }
    }, [chatMessages, chatLoading])

    // idle blink loop
    useEffect(() => {
        let timeoutId
        const scheduleBlink = () => {
            timeoutId = setTimeout(() => {
                blinkRaw.set(0.08)
                setTimeout(() => blinkRaw.set(1), 110)
                scheduleBlink()
            }, randomBetween(3200, 6800))
        }
        scheduleBlink()
        return () => clearTimeout(timeoutId)
    }, [blinkRaw])

    // occasional idle head movement (paused while hovered, since hover drives its own look-at-cursor rotation)
    useEffect(() => {
        let timeoutId
        const scheduleTilt = () => {
            timeoutId = setTimeout(() => {
                if (!hoveredRef.current) {
                    headRotateRaw.set(randomBetween(-5, 5))
                    setTimeout(() => {
                        if (!hoveredRef.current) headRotateRaw.set(0)
                    }, 850)
                }
                scheduleTilt()
            }, randomBetween(5500, 10500))
        }
        scheduleTilt()
        return () => clearTimeout(timeoutId)
    }, [headRotateRaw])

    // occasional contextual speech bubble
    useEffect(() => {
        let timeoutId
        const scheduleMessage = () => {
            timeoutId = setTimeout(() => {
                if (!panelOpenRef.current) {
                    setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
                    setTimeout(() => setMessage(null), 4200)
                }
                scheduleMessage()
            }, randomBetween(60000, 120000))
        }
        scheduleMessage()
        return () => clearTimeout(timeoutId)
    }, [])

    // close panel on outside click / Escape
    useEffect(() => {
        if (!panelOpen) return undefined
        function handlePointerDown(e) {
            if (rootRef.current && !rootRef.current.contains(e.target)) setPanelOpen(false)
        }
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
                setPanelOpen(false)
            }
        }
        document.addEventListener('mousedown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('mousedown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [panelOpen])

    // eyes and head vertical position always track the cursor across the
    // whole page; the head's extra rotational tilt only kicks in while
    // actually hovered (idle head tilts take over the rest of the time,
    // scheduled separately below)
    useEffect(() => {
        function handleGlobalPointerMove(e) {
            if (!rootRef.current) return
            const rect = rootRef.current.getBoundingClientRect()
            const cx = rect.right - rect.width * 0.32
            const cy = rect.top + rect.height * 0.3
            const dx = e.clientX - cx
            const dy = e.clientY - cy
            eyeXRaw.set(Math.max(-3, Math.min(3, dx / 45)))
            headYRaw.set(Math.max(-4, Math.min(4, dy / 60)))
            if (hoveredRef.current) {
                headRotateRaw.set(Math.max(-6, Math.min(6, dx / 28)) + Math.max(-2, Math.min(2, dy / 200)))
            }
        }
        window.addEventListener('mousemove', handleGlobalPointerMove)
        return () => window.removeEventListener('mousemove', handleGlobalPointerMove)
    }, [eyeXRaw, headRotateRaw, headYRaw])

    function handleMouseEnter() {
        hoveredRef.current = true
        setHovered(true)
    }

    function handleMouseLeave() {
        hoveredRef.current = false
        setHovered(false)
        headRotateRaw.set(0)
    }

    function scrollToSection(id) {
        if (lenis) lenis.scrollTo(id, { offset: 0 })
        else document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
        setPanelOpen(false)
    }

    async function handleAskSubmit(e) {
        e.preventDefault()
        const question = chatInput.trim()
        if (!question || chatLoading) return

        setChatMessages((prev) => [...prev, { role: 'user', text: question }])
        setChatInput('')
        setChatLoading(true)

        try {
            const res = await fetch(`${API_BASE}/api/ask`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            })

            if (res.status === 429) {
                setChatMessages((prev) => [...prev, { role: 'assistant', text: 'Give me a moment before asking again.' }])
            } else if (!res.ok) {
                setChatMessages((prev) => [...prev, { role: 'assistant', text: "I couldn't process that just now. Please try again." }])
            } else {
                const data = await res.json()
                setChatMessages((prev) => [...prev, { role: 'assistant', text: data.answer }])
            }
        } catch {
            setChatMessages((prev) => [...prev, { role: 'assistant', text: "I couldn't reach the server. Please try again shortly." }])
        } finally {
            setChatLoading(false)
        }
    }

    return (
        <div className="robot-assistant-root" ref={rootRef}>
            <AnimatePresence>
                {message && !panelOpen && (
                    <motion.div
                        className="robot-speech-bubble"
                        initial={{ opacity: 0, y: 8, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {panelOpen && view === 'menu' && (
                    <motion.div
                        key="menu"
                        className="robot-panel"
                        role="menu"
                        data-lenis-prevent
                        initial={{ opacity: 0, scale: 0.92, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 8 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="robot-panel-header">
                            <span className="robot-panel-title">NOVA</span>
                            <button type="button" className="robot-panel-close" onClick={() => setPanelOpen(false)} aria-label="Close menu">
                                <CloseIcon />
                            </button>
                        </div>

                        <button type="button" className="robot-panel-item" role="menuitem" onClick={() => setView('chat')}>
                            <ChatIcon />
                            <span>Ask NOVA</span>
                        </button>
                        <a
                            className="robot-panel-item"
                            role="menuitem"
                            href="/resume.pdf"
                            download="Aaryan_Puri_Resume.pdf"
                            onClick={() => setPanelOpen(false)}
                        >
                            <DownloadIcon />
                            <span>Download Resume</span>
                        </a>
                        <button type="button" className="robot-panel-item" role="menuitem" onClick={() => scrollToSection('#experience')}>
                            <ExperienceIcon />
                            <span>Experience</span>
                        </button>
                        <button type="button" className="robot-panel-item" role="menuitem" onClick={() => scrollToSection('#projects')}>
                            <ProjectsIcon />
                            <span>View Projects</span>
                        </button>
                        <button type="button" className="robot-panel-item" role="menuitem" onClick={() => scrollToSection('#skills')}>
                            <SkillsIcon />
                            <span>Skills</span>
                        </button>
                        <button type="button" className="robot-panel-item" role="menuitem" onClick={() => scrollToSection('#certifications')}>
                            <CertificationsIcon />
                            <span>Certifications</span>
                        </button>
                        <button type="button" className="robot-panel-item" role="menuitem" onClick={() => scrollToSection('#achievements')}>
                            <AchievementsIcon />
                            <span>Achievements</span>
                        </button>
                        <button type="button" className="robot-panel-item" role="menuitem" onClick={() => scrollToSection('#research')}>
                            <ResearchIcon />
                            <span>Research</span>
                        </button>
                        <button type="button" className="robot-panel-item" role="menuitem" onClick={() => scrollToSection('#testimonials')}>
                            <TestimonialsIcon />
                            <span>Testimonials</span>
                        </button>
                        <button type="button" className="robot-panel-item" role="menuitem" onClick={() => scrollToSection('#contact')}>
                            <ContactIcon />
                            <span>Contact Me</span>
                        </button>
                    </motion.div>
                )}

                {panelOpen && view === 'chat' && (
                    <motion.div
                        key="chat"
                        className="robot-panel robot-panel-chat"
                        role="dialog"
                        aria-label="Ask NOVA"
                        initial={{ opacity: 0, scale: 0.92, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 8 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="robot-panel-header">
                            <button type="button" className="robot-panel-back" onClick={() => setView('menu')} aria-label="Back to menu">
                                <BackIcon />
                            </button>
                            <span className="robot-panel-title">NOVA</span>
                            <button type="button" className="robot-panel-close" onClick={() => setPanelOpen(false)} aria-label="Close">
                                <CloseIcon />
                            </button>
                        </div>

                        <div className="robot-chat-body" ref={chatBodyRef} data-lenis-prevent>
                            {chatMessages.map((m, i) => (
                                <div key={i} className={`robot-chat-message robot-chat-message-${m.role}`}>
                                    {linkifyText(m.text)}
                                </div>
                            ))}
                            {chatLoading && (
                                <div className="robot-chat-message robot-chat-message-assistant robot-chat-typing">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            )}
                        </div>

                        <form className="robot-chat-form" onSubmit={handleAskSubmit}>
                            <input
                                ref={(el) => {
                                    chatInputRef.current = el
                                    if (el) el.focus()
                                }}
                                type="text"
                                className="robot-chat-input"
                                placeholder="Ask about Aaryan's work..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                maxLength={300}
                                aria-label="Your question for NOVA"
                            />
                            <button type="submit" className="robot-chat-send" aria-label="Send" disabled={chatLoading || !chatInput.trim()}>
                                <SendIcon />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                ref={buttonRef}
                type="button"
                className="robot-button"
                aria-label="Open NOVA, Aaryan's Physical AI assistant"
                aria-haspopup="menu"
                aria-expanded={panelOpen}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setPanelOpen((v) => !v)}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 1.02 }}
            >
                <motion.span
                    className="robot-glow"
                    animate={{ opacity: hovered ? 0.85 : 0.45, scale: hovered ? 1.15 : 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                />

                <motion.svg
                    viewBox="0 0 100 130"
                    className="robot-svg"
                    animate={{ scale: [1, 1.018, 1] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <defs>
                        <linearGradient id="robotBody" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3a3a40" />
                            <stop offset="55%" stopColor="#232326" />
                            <stop offset="100%" stopColor="#111113" />
                        </linearGradient>
                        <linearGradient id="robotHead" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#48484f" />
                            <stop offset="60%" stopColor="#28282c" />
                            <stop offset="100%" stopColor="#161618" />
                        </linearGradient>
                        <linearGradient id="robotEye" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#bfe6ff" />
                            <stop offset="100%" stopColor="#4fa8f5" />
                        </linearGradient>
                        <radialGradient id="robotCore" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#cdeeff" />
                            <stop offset="100%" stopColor="#3f9dee" />
                        </radialGradient>
                    </defs>

                    {/* shoulders */}
                    <rect x="10" y="96" width="16" height="11" rx="5.5" fill="url(#robotBody)" />
                    <rect x="74" y="96" width="16" height="11" rx="5.5" fill="url(#robotBody)" />

                    {/* torso */}
                    <rect x="26" y="88" width="48" height="38" rx="15" fill="url(#robotBody)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <motion.circle
                        cx="50"
                        cy="107"
                        r="5"
                        fill="url(#robotCore)"
                        animate={{ opacity: [0.55, 1, 0.55] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* neck */}
                    <rect x="42" y="78" width="16" height="13" rx="4" fill="#1c1c1e" />

                    <motion.g style={{ rotate: headRotate, y: headY, originX: '50px', originY: '46px' }}>
                        {/* head */}
                        <rect x="18" y="6" width="64" height="62" rx="24" fill="url(#robotHead)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

                        {/* side sensor light */}
                        <motion.circle
                            cx="80"
                            cy="24"
                            r="2.4"
                            fill="#5cb2ff"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        {/* visor */}
                        <rect x="27" y="30" width="46" height="17" rx="8.5" fill="#07080a" />
                        <clipPath id="visorClip">
                            <rect x="27" y="30" width="46" height="17" rx="8.5" />
                        </clipPath>
                        <g clipPath="url(#visorClip)">
                            <motion.g style={{ x: eyeX }}>
                                <motion.rect
                                    x="35"
                                    y="35.5"
                                    width="10"
                                    height="6"
                                    rx="3"
                                    fill="url(#robotEye)"
                                    style={{ scaleY: blinkScaleY, originY: '38.5px' }}
                                />
                                <motion.rect
                                    x="55"
                                    y="35.5"
                                    width="10"
                                    height="6"
                                    rx="3"
                                    fill="url(#robotEye)"
                                    style={{ scaleY: blinkScaleY, originY: '38.5px' }}
                                />
                            </motion.g>
                        </g>
                    </motion.g>
                </motion.svg>
            </motion.button>
        </div>
    )
}

export default RobotAssistant
