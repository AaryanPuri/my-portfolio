import './Hero.css'
import starImg from '../assets/star.png'
import lightningImg from '../assets/lightning.png'
import { motion, useMotionValueEvent } from 'framer-motion'
import { useRef, useLayoutEffect } from 'react'

function Hero({ opacity, y }) {
    const ref = useRef(null)

    useLayoutEffect(() => {
        if (ref.current) ref.current.style.opacity = opacity.get()
    }, [opacity])

    useMotionValueEvent(opacity, 'change', (v) => {
        if (ref.current) ref.current.style.opacity = v
    })

    return (
        <motion.div ref={ref} className="hero-copy" style={{ y }}>
            <h1>PYTHON<br/>DEVELOPER</h1>
            <motion.img src={starImg} drag className="star" />
            <motion.img
                src={lightningImg}
                drag
                className="lightning"
                style={{ rotate: 15 }}
            />
        </motion.div>
    )
}

export default Hero
