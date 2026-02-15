import { useState } from 'react'
import { useProjects } from '../../context/useProjects'
import { Gallery } from '../../components/Project/Gallery/Gallery'
import { Collapse } from '../../components/Project/Collapse/Collapse'
import style from './Project.module.scss'

export function Project() {
  const { projects, technologies, languages, projectTypes, loading } =
    useProjects()
  const [activeTab, setActiveTab] = useState<'projects' | 'tags'>('projects')

  if (loading) return <p>Chargement...</p>

  return (
    <div className={style.container}>
      <h1>Gestion des projets</h1>

      {/* Tabs */}
      <div className={style.tabs}>
        <button
          className={activeTab === 'projects' ? style.active : ''}
          onClick={() => setActiveTab('projects')}
        >
          Projets
        </button>
        <button
          className={activeTab === 'tags' ? style.active : ''}
          onClick={() => setActiveTab('tags')}
        >
          Tags
        </button>
      </div>

      {/* Contenu des Tabs */}
      <div className={style.tabContent}>
        {activeTab === 'projects' && <Gallery projects={projects} />}

        {activeTab === 'tags' && (
          <div className={style.tagsContainer}>
            <Collapse title="Languages">
              <ul>
                {languages.map((lang: any) => (
                  <li key={lang._id}>{lang.name}</li>
                ))}
              </ul>
            </Collapse>

            <Collapse title="Technologies">
              <ul>
                {technologies.map((tech: any) => (
                  <li key={tech._id}>{tech.name}</li>
                ))}
              </ul>
            </Collapse>

            <Collapse title="Project Types">
              <ul>
                {projectTypes.map((type: any) => (
                  <li key={type._id}>{type.name}</li>
                ))}
              </ul>
            </Collapse>
          </div>
        )}
      </div>
    </div>
  )
}
