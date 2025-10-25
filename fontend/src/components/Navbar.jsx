import React from 'react'

export default function Navbar(){
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#home" className="logo">Your Name</a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <a href="/cv.pdf" className="cv" download>Download CV</a>
        </nav>
      </div>
    </header>
  )
}
