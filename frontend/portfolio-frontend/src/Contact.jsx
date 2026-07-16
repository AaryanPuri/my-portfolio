import './Contact.css'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import RevealWords from './components/RevealWords'

const LINKS = [
    { label: 'Email', href: 'mailto:aaryanpuri75@gmail.com', value: 'aaryanpuri75@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aaryan-puri-04923a228', value: 'Aaryan Puri' },
    { label: 'GitHub', href: 'https://github.com/AaryanPuri', value: 'github.com/AaryanPuri' },
    { label: 'X', href: 'https://x.com/Aaryan_75', value: '@Aaryan_75' },
]

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const RESUBMIT_COOLDOWN_MS = 15000

function ArrowUpRightIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function CloseIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    )
}

function ContactCard({ link, index }) {
    return (
        <motion.a
            className="contact-card"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
        >
            <span className="contact-card-label">{link.label}</span>
            <span className="contact-card-value">{link.value}</span>
        </motion.a>
    )
}

function ContactModal({ onClose, onSuccess }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('idle') // idle | submitting | error
    const [errorMsg, setErrorMsg] = useState('')
    const lastSubmitRef = useRef(0)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        const { overflow } = document.body.style
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = overflow
        }
    }, [onClose])

    async function handleSubmit(e) {
        e.preventDefault()
        if (status === 'submitting') return

        const now = Date.now()
        if (now - lastSubmitRef.current < RESUBMIT_COOLDOWN_MS) {
            setErrorMsg('Please wait a few seconds before sending another message.')
            setStatus('error')
            return
        }

        const trimmedName = name.trim()
        const trimmedEmail = email.trim()
        const trimmedMessage = message.trim()
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)

        if (!trimmedName || !emailValid || trimmedMessage.length < 10) {
            setErrorMsg('Please fill in your name, a valid email, and a message (10+ characters).')
            setStatus('error')
            return
        }

        setStatus('submitting')
        setErrorMsg('')

        try {
            const res = await fetch(`${API_BASE}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: trimmedName, email: trimmedEmail, message: trimmedMessage }),
            })

            if (!res.ok) throw new Error('Request failed')

            lastSubmitRef.current = Date.now()
            onSuccess()
            onClose()
        } catch (err) {
            setStatus('error')
            setErrorMsg('Something went wrong. Please try again or email me directly.')
        }
    }

    return (
        <motion.div
            className="contact-modal-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div
                className="contact-modal"
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
                <button className="contact-modal-close" onClick={onClose} aria-label="Close">
                    <CloseIcon />
                </button>

                <h3 className="contact-modal-heading">Send a message</h3>
                <p className="contact-modal-subtext">I'll get back to you as soon as I can.</p>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="contact-form-field">
                        <label htmlFor="contact-name">Name</label>
                        <input
                            id="contact-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            autoComplete="name"
                        />
                    </div>

                    <div className="contact-form-field">
                        <label htmlFor="contact-email">Email</label>
                        <input
                            id="contact-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className="contact-form-field">
                        <label htmlFor="contact-message">Message</label>
                        <textarea
                            id="contact-message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="What would you like to talk about?"
                            rows={5}
                        />
                    </div>

                    {status === 'error' && <p className="contact-form-error">{errorMsg}</p>}

                    <button type="submit" className="contact-form-submit" disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'Sending…' : 'Send Message'}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    )
}

function Toast({ message, onDone }) {
    useEffect(() => {
        const t = setTimeout(onDone, 3200)
        return () => clearTimeout(t)
    }, [onDone])

    return (
        <motion.div
            className="contact-toast"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
            {message}
        </motion.div>
    )
}

function Contact() {
    const [modalOpen, setModalOpen] = useState(false)
    const [toast, setToast] = useState(null)

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">
                <RevealWords as="h2" text="Let's Talk." className="contact-heading" />
                <RevealWords
                    as="p"
                    text="Let's connect and discuss ideas, technology, and opportunities."
                    blur={6}
                    delay={0.2}
                    className="contact-subtext"
                />

                <div className="contact-grid">
                    {LINKS.map((link, i) => (
                        <ContactCard key={link.label} link={link} index={i} />
                    ))}
                </div>

                <motion.button
                    className="contact-message-button"
                    onClick={() => setModalOpen(true)}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                >
                    Send a Message
                    <ArrowUpRightIcon />
                </motion.button>
            </div>

            <AnimatePresence>
                {modalOpen && (
                    <ContactModal
                        onClose={() => setModalOpen(false)}
                        onSuccess={() => setToast('Message sent successfully.')}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {toast && <Toast message={toast} onDone={() => setToast(null)} />}
            </AnimatePresence>
        </section>
    )
}

export default Contact
