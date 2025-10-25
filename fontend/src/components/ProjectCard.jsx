import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({project}){
  return (
    <motion.article className="project-card" whileHover={{ scale: 1.02 }}>
      <img src={project.image} alt={project.title} />
      <div className="proj-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p className="tech">{project.tech.join(' • ')}</p>
        <a href={project.repo} target="_blank" rel="noreferrer">View on GitHub</a>
      </div>
    </motion.article>
  )
}
