// src/components/Project/Card.tsx
import { Link } from 'react-router-dom'
import style from './Cards.module.scss'

export const Card = ({ project }: { project: any }) => {
  return (
    <div className={style.cardItem}>
      <img src={project.coverImage} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.shortDescription}</p>
      <Link to={`/projects/${project._id}`}>Voir le projet</Link>
    </div>
  )
}
