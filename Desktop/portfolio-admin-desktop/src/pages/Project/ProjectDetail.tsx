// src/pages/Project/ProjectDetail.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectById } from '../../services/ProjectService'

export const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState<any>(null)

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProjectById(id!)
      setProject(data)
    }
    fetchProject()
  }, [id])

  if (!project) return <p>Chargement...</p>

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.shortDescription}</p>
      <div className="gallery">
        {project.gallery.map((item: any, index: number) => (
          <img key={index} src={item.desktopUrl} alt={item.alt} />
        ))}
      </div>
      {/* Afficher aussi stack, presentation, liens GitHub et live si nécessaire */}
    </div>
  )
}
