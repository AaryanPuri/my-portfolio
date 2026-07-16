import './About.css'
import { motion, useMotionValueEvent } from 'framer-motion'
import { useRef, useLayoutEffect } from 'react'

function About({ opacity, x }) {
    const ref = useRef(null)

    useLayoutEffect(() => {
        if (ref.current) ref.current.style.opacity = opacity.get()
    }, [opacity])

    useMotionValueEvent(opacity, 'change', (v) => {
        if (ref.current) ref.current.style.opacity = v
    })

    return (
        <motion.div ref={ref} className="about-copy" style={{ x }}>
            <p>
                I'm Aaryan, currently working as a Jr. Python Developer at Zensar
                Technologies, working with NVIDIA in the Physical AI domain.
                Previously, I worked as an AI Engineer Intern, where I built Agentic
                AI systems using RAG pipelines, vector databases, and LLM-powered
                workflows. I'm passionate about AI/ML and Backend Engineering.
            </p>
        </motion.div>
    )
}

export default About
