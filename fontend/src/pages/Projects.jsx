import React from 'react'
import projects from '../data/projects'
import ProjectCard from '../components/ProjectCard'

export default function Projects(){
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map(p=> <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  )
}
