import { useRef } from 'react'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import './FromIdea.css'

const TEXT =
    'Contributing to Physical AI and building AI-powered products, automation workflows, and scalable backend systems from concept to deployment.'

function RevealWord({ word, scrollYProgress, start, end }) {
    const ref = useRef(null)
    const color = useTransform(scrollYProgress, [start, end], ['rgba(17, 17, 17, 0.15)', 'rgb(17, 17, 17)'])

    useMotionValueEvent(color, 'change', (v) => {
        if (ref.current) ref.current.style.color = v
    })

    return (
        <span ref={ref} className="idea-word" style={{ color: color.get() }}>
            {word}
        </span>
    )
}

function FromIdea() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    const words = TEXT.split(' ')

    return (
        <section className="from-idea" ref={containerRef}>
            <div className="idea-stage">
                <p className="idea-text">
                    {words.map((word, i) => {
                        const start = (i / words.length) * 0.8
                        const end = start + (1 / words.length) * 0.8 + 0.1
                        return (
                            <RevealWord
                                key={i}
                                word={word}
                                scrollYProgress={scrollYProgress}
                                start={start}
                                end={Math.min(end, 1)}
                            />
                        )
                    })}
                </p>
            </div>
        </section>
    )
}

export default FromIdea
