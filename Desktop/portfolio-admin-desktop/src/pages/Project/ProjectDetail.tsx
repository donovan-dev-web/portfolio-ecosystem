// src/pages/Project/ProjectDetail.tsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProjectById } from '../../services/ProjectService'
import style from './ProjectDetails.module.scss'

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

  if (!project) return <p className={style.loading}>Chargement...</p>

  const cover =
    typeof project.coverImage === 'string'
      ? project.coverImage
      : project.coverImage?.large || project.coverImage?.medium || project.coverImage?.small

  const galleryItems = Array.isArray(project.gallery) ? project.gallery : []

  return (
    <div className={style.page}>
      <div className={style.header}>
        <div>
          <h1 className={style.title}>Detail du projet</h1>
          <p className={style.subtitle}>
            Consulte les informations principales du projet et sa galerie.
          </p>
        </div>
        <Link to="/projects" className={style.backLink}>
          Retour a la liste
        </Link>
      </div>

      <section className={style.heroPanel}>
        {cover && <img src={cover} alt={project.title} className={style.coverImage} />}
        <div className={style.heroContent}>
          <h2>{project.title}</h2>
          <p>{project.shortDescription}</p>
        </div>
      </section>

      <section className={style.galleryPanel}>
        <h3>Galerie</h3>
        {galleryItems.length > 0 ? (
          <div className={style.gallery}>
            {galleryItems.map((item: any, index: number) => (
              <img
                key={index}
                src={item.desktop?.medium || item.desktop?.small || item.desktop?.large}
                alt={item.alt || `${project.title} ${index + 1}`}
              />
            ))}
          </div>
        ) : (
          <p className={style.emptyState}>Aucune image de galerie pour ce projet.</p>
        )}
      </section>
    </div>
  )
}
