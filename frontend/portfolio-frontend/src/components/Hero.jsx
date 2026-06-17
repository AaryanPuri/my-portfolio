import './Hero.css'
import myPhoto from '../assets/my-photo.jpg' 
import { useState, useEffect } from 'react'

function Hero() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
    return(
<section className="hero">
    <div className="hero-title">
        <span 
         className="star"
          style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}
           >✦</span>
        <h1>PYTHON<br/>DEVELOPER</h1>
        <span 
         className="star"
          style={{ transform: `translate(${mousePos.x * -0.02}px, ${mousePos.y * -0.02}px)` }}
           >✦</span>
    </div>
    <img src={myPhoto} alt="Aaryan" className="hero-photo" />
    <div className="hero-bottom">
        <p>©2026</p>
    </div>
</section>
    )
}

export default Hero