import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero from './Hero'
import Hey from './Hey'
import About from '../About'
import myPhoto from '../assets/my-photo5.jpg'
import './HeroAbout.css'

// below 1280px the image and About text stack vertically (see HeroAbout.css) —
// the side-by-side row needs ~1200px (640px image + gap + 520px text) to avoid
// clipping the text, so anything narrower stays stacked and centered, no
// horizontal compensation needed there, unlike the desktop side-by-side layout
function useIsStacked() {
    const [isStacked, setIsStacked] = useState(
        () => typeof window !== 'undefined' && window.innerWidth <= 1280
    )

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 1280px)')
        const handler = (e) => setIsStacked(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    return isStacked
}

function HeroAbout() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })
    const isStacked = useIsStacked()

    // rotation drives the flip early; scale overlaps it and settles a little later
    // so the grow and the flip read as one continuous move, not two separate steps.
    // On desktop the image lives in a flex row with the About text, so its resting
    // (untransformed) position already sits left-of-center — cardX starts
    // positive to hold it centered under the hero title, then eases to 0 as
    // it settles into that grouped position alongside the text. On mobile/tablet
    // the group stacks vertically instead, so the image is already centered and
    // needs no horizontal compensation at all.
    const cardRotation = useTransform(scrollYProgress, [0, 0.55], [0, 180])
    const cardScale = useTransform(scrollYProgress, [0, 0.75], [0.5, 1])
    const cardX = useTransform(scrollYProgress, [0.15, 0.85], isStacked ? [0, 0] : [280, 0])
    const cardY = useTransform(scrollYProgress, [0, 0.6], [220, 0])

    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const heroY = useTransform(scrollYProgress, [0, 0.2], [-175, -215])

    // Hey!, the image, and the About copy all belong to the same About
    // section and reveal together — none of them exist during the hero phase
    const aboutOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1])
    const aboutX = useTransform(scrollYProgress, [0.55, 0.85], [40, 0])

    // Hey! leads in just ahead of the About copy and stays visible through
    // to the point About Me is fully shown
    const heyOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.85], [0, 1, 1])

    return (
        <section className="hero-about" id="hero" ref={containerRef}>
            <div className="stage">
                <Hero opacity={heroOpacity} y={heroY} />

                <div className="about-section">
                    <Hey opacity={heyOpacity} />

                    <div className="image-text-group">
                        <div className="card-perspective">
                            <motion.div
                                className="hero-card"
                                style={{
                                    x: cardX,
                                    y: cardY,
                                    scale: cardScale,
                                    rotateY: cardRotation,
                                }}
                            >
                                <img src={myPhoto} alt="Aaryan" className="card-front" />
                                <img src={myPhoto} alt="Aaryan" className="card-back" />
                            </motion.div>
                        </div>

                        <About opacity={aboutOpacity} x={aboutX} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroAbout
