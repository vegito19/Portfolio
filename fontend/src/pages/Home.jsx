import React from 'react'
import { motion } from 'framer-motion'

export default function Home(){
  return (
    <section id="home" className="hero">
      <div className="container">
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>Hi, I'm Your Name</motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>I build web apps using React. I enjoy clean UI, good UX and learning new tech.</motion.p>
        <div className="hero-actions">
          <a href="#projects" className="btn">See my work</a>
          <a href="/cv.pdf" className="btn secondary" download>Download CV</a>
        </div>
      </div>
    </section>
  )
}
