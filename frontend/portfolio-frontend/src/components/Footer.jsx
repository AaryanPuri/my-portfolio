import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './Footer.css'
import RevealWords from './RevealWords'

const QUICK_LINKS = [
    { label: 'About', href: '#hero' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
    { label: 'Download Resume', href: '/resume.pdf', download: 'Aaryan_Puri_Resume.pdf' },
]

const SOCIALS = [
    { label: 'Email', href: 'mailto:aaryanpuri75@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aaryan-puri-04923a228' },
    { label: 'GitHub', href: 'https://github.com/AaryanPuri' },
    { label: 'X', href: 'https://x.com/Aaryan_75' },
]

const columnStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
}

const linkItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

function FooterLinkGroup({ heading, links, external }) {
    return (
        <motion.div className="footer-column" variants={linkItem}>
            <h4>{heading}</h4>
            <motion.div className="footer-links" variants={columnStagger}>
                {links.map((link) => (
                    <motion.a
                        key={link.label}
                        href={link.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        download={link.download}
                        className="footer-link"
                        variants={linkItem}
                    >
                        <span className="footer-link-label">{link.label}</span>
                    </motion.a>
                ))}
            </motion.div>
        </motion.div>
    )
}

function Footer() {
    const footerRef = useRef(null)
    const [parallaxEnabled, setParallaxEnabled] = useState(false)

    const mvX = useMotionValue(0)
    const mvY = useMotionValue(0)
    const springX = useSpring(mvX, { stiffness: 50, damping: 18, mass: 0.6 })
    const springY = useSpring(mvY, { stiffness: 50, damping: 18, mass: 0.6 })

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 769px) and (hover: hover) and (pointer: fine)')
        setParallaxEnabled(mq.matches)
        const handler = (e) => setParallaxEnabled(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    function handleMouseMove(e) {
        if (!parallaxEnabled || !footerRef.current) return
        const rect = footerRef.current.getBoundingClientRect()
        const relX = (e.clientX - rect.left) / rect.width - 0.5
        const relY = (e.clientY - rect.top) / rect.height - 0.5
        mvX.set(relX * 44)
        mvY.set(relY * 32)
    }

    function handleMouseLeave() {
        mvX.set(0)
        mvY.set(0)
    }

    return (
        <footer
            className="site-footer"
            ref={footerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="footer-gradient" />
            <div className="footer-grain" />

            <motion.div
                className="footer-giant-crop"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div className="footer-giant-type" style={{ x: springX, y: springY }}>
                    AARYAN
                </motion.div>
            </motion.div>

            <motion.div
                className="footer-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
                <RevealWords as="h2" text="Building Intelligent Systems." className="footer-tagline" />

                <div className="footer-columns">
                    <FooterLinkGroup heading="/Quick links" links={QUICK_LINKS} />
                    <FooterLinkGroup heading="/Connect" links={SOCIALS} external />
                </div>

                <motion.p className="footer-meta" variants={linkItem}>@2026</motion.p>
            </motion.div>
        </footer>
    )
}

export default Footer
