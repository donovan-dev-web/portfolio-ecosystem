import { useState, useEffect, useRef } from 'react'
import { useProjects } from '../../context/useProjects'
import { Gallery } from '../../components/Project/Gallery/Gallery'
import { Collapse } from '../../components/Project/Collapse/Collapse'
import { ProjectModal } from '../../components/Project/ProjectFormModal/ProjectModal'
import style from './Project.module.scss'
import { type Project as ProjectType } from '../../types/project'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function Project() {
  const {
    projects,
    technologies,
    languages,
    projectTypes,
    loading,
    reorderProjects,
  } = useProjects()

  const [activeTab, setActiveTab] = useState<'projects' | 'tags'>('projects')
  const [localProjects, setLocalProjects] = useState<ProjectType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const prevProjectsRef = useRef<ProjectType[]>([])

  // 🔹 Sync avec le context uniquement si les projects ont changé
  useEffect(() => {
    if (Array.isArray(projects) && projects !== prevProjectsRef.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setLocalProjects(projects)
      prevProjectsRef.current = projects
    }
  }, [projects])

  if (loading) return <p>Chargement...</p>

  // 🔹 Drag & Drop
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(localProjects)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }))

    setLocalProjects(updatedItems)
  }

  // 🔹 Appliquer les changements
  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    reorderProjects(localProjects)
  }

  return (
    <div className={style.container}>
      <h1>Gestion des projets</h1>

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

      <div className={style.tabContent}>
        {activeTab === 'projects' && (
          <>
            {/* 🔹 Bouton Nouveau Projet */}
            <div className={style.newProjectBtnWrapper}>
              <button
                type="button"
                className={style.newProjectBtn}
                onClick={() => setIsModalOpen(true)}
              >
                + Nouveau Projet
              </button>
            </div>

            {/* 🔹 Modal */}
            <ProjectModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />

            {/* 🔹 Gallery avec Drag & Drop */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Gallery projects={localProjects} />
            </DragDropContext>

            <button
              type="button"
              className={style.applyBtn}
              onClick={handleApply}
            >
              Appliquer les modifications
            </button>
          </>
        )}

        {activeTab === 'tags' && (
          <div className={style.tagsContainer}>
            <Collapse title="Languages">
              <ul>
                {languages.map((lang) => (
                  <li key={lang._id}>{lang.name}</li>
                ))}
              </ul>
            </Collapse>
            <Collapse title="Technologies">
              <ul>
                {technologies.map((tech) => (
                  <li key={tech._id}>{tech.name}</li>
                ))}
              </ul>
            </Collapse>
            <Collapse title="Project Types">
              <ul>
                {projectTypes.map((type) => (
                  <li key={type._id}>{type.name}</li>
                ))}
              </ul>
            </Collapse>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  )
}
