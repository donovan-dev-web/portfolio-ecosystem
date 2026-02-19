import { Card } from '../Cards/Card'
import style from './Gallery.module.scss'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import { type Project as ProjectType } from '../../../types/project'

interface GalleryProps {
  projects: ProjectType[]
}

export const Gallery = ({ projects }: GalleryProps) => {
  if (!Array.isArray(projects)) return null

  return (
    <Droppable droppableId="projects-droppable">
      {(provided) => (
        <div
          className={style.gallery}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {projects.map((project, index) => (
            <Draggable
              key={project._id}
              draggableId={project._id}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Card project={project} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
