// src/components/Project/Card.tsx
import { Link } from 'react-router-dom'
import style from './Cards.module.scss'
import { type Project } from '../../../types/project'
import { Trash2 } from 'lucide-react'
import { useProjects } from '../../../context/useProjects'

interface Props {
  project: Project
  dragHandleProps?: any
}

export const Card = ({ project, dragHandleProps }: Props) => {
  const { deleteProject } = useProjects()

  const handleDelete = () => {
    deleteProject(project._id, project.title)
  }

  return (
    <div className={style.cardItem}>
      <div className={style.draggableHandler} {...dragHandleProps}>
        <span>::</span>
      </div>
      <div className={style.OrderINdex}>
        <span>{project.order}</span>
      </div>
      <div className={style.CardsImg}>
        <img src={project.coverImage} alt={project.title} />
      </div>
      <div className={style.CardsInfo}>
        <h3>{project.title}</h3>
        <p>{project.shortDescription}</p>
      </div>
      <div className={style.CardsActions}>
        <Link to={`/projects/${project._id}`}>Voir le projet</Link>
        <button
          type="button"
          className={style.deleteBtn}
          onClick={handleDelete}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
