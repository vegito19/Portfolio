import React from 'react'

const skills = ["JavaScript", "React", "Node.js", "HTML", "CSS"]

export default function Skills(){
  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2>Skills</h2>
        <ul className="skills-list">
          {skills.map(s=> <li key={s}>{s}</li>)}
        </ul>
      </div>
    </section>
  )
}
