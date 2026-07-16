import './Hey.css'
import { useMotionValueEvent } from 'framer-motion'
import { useRef, useLayoutEffect } from 'react'

function Hey({ opacity }) {
    const ref = useRef(null)

    useLayoutEffect(() => {
        if (ref.current) ref.current.style.opacity = opacity.get()
    }, [opacity])

    useMotionValueEvent(opacity, 'change', (v) => {
        if (ref.current) ref.current.style.opacity = v
    })

    return (
        <h2 ref={ref} className="hey-heading">
            Hey!
        </h2>
    )
}

export default Hey
