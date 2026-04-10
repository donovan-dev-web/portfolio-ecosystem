'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  LayoutGrid,
  List,
  Blocks,
  ChevronsLeftRightEllipsis,
  TabletSmartphone,
  Github,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

import styles from './projectsExplorer.module.scss';
import type {
  FilterOption,
  ProjectsPageProject,
} from './projectsExplorer.types';

type ExplorerProps = {
  projects: ProjectsPageProject[];
  projectTypes: FilterOption[];
  technologies: FilterOption[];
  languages: FilterOption[];
};

type ViewMode = 'list' | 'grid';

function toggleSelection(items: string[], value: string) {
  return items.includes(value)
    ? items.filter((item) => item !== value)
    : [...items, value];
}

export function ProjectsExplorer({
  projects,
  projectTypes,
  technologies,
  languages,
}: ExplorerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedType, setSelectedType] = useState('Tous');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const typeOptions = useMemo(
    () => ['Tous', ...projectTypes.map((item) => item.name)],
    [projectTypes]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesType =
        selectedType === 'Tous' || project.projectType?.name === selectedType;
      const matchesTech =
        selectedTechs.length === 0 ||
        project.technologies.some((item) => selectedTechs.includes(item.name));
      const matchesLanguage =
        selectedLanguages.length === 0 ||
        project.languages.some((item) => selectedLanguages.includes(item.name));

      return matchesType && matchesTech && matchesLanguage;
    });
  }, [projects, selectedLanguages, selectedTechs, selectedType]);

  const resetFilters = () => {
    setSelectedType('Tous');
    setSelectedTechs([]);
    setSelectedLanguages([]);
  };

  return (
    <div className={styles.explorerShell}>
      <div className={styles.filterPanel}>
        <div className={styles.filterGroup}>
          <span>Type</span>
          <div className={styles.filterChips}>
            {typeOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={
                  selectedType === option
                    ? styles.filterChipActive
                    : styles.filterChip
                }
                onClick={() => setSelectedType(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterSelectRow}>
          <div className={styles.filterDropdownGroup}>
            <span>Technologies</span>
            <details className={styles.dropdownPanel}>
              <summary className={styles.dropdownSummary}>
                <div className={styles.summaryIndicator}>
                  <span />
                  <span />
                </div>
                {selectedTechs.length > 0
                  ? `${selectedTechs.length} techno(s) sélectionnée(s)`
                  : 'Choisir des technologies'}
              </summary>
              <div className={styles.dropdownList}>
                {technologies.map((option) => (
                  <label key={option.id} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={selectedTechs.includes(option.name)}
                      onChange={() =>
                        setSelectedTechs((current) =>
                          toggleSelection(current, option.name)
                        )
                      }
                    />
                    <span>{option.name}</span>
                  </label>
                ))}
              </div>
            </details>
          </div>

          <div className={styles.filterDropdownGroup}>
            <span>Langages</span>
            <details className={styles.dropdownPanel}>
              <summary className={styles.dropdownSummary}>
                <div className={styles.summaryIndicator}>
                  <span />
                  <span />
                </div>
                {selectedLanguages.length > 0
                  ? `${selectedLanguages.length} langage(s) sélectionné(s)`
                  : 'Choisir des langages'}
              </summary>
              <div className={styles.dropdownList}>
                {languages.map((option) => (
                  <label key={option.id} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(option.name)}
                      onChange={() =>
                        setSelectedLanguages((current) =>
                          toggleSelection(current, option.name)
                        )
                      }
                    />
                    <span>{option.name}</span>
                  </label>
                ))}
              </div>
            </details>
          </div>
        </div>

        <div className={styles.filterActions}>
          <button
            type="button"
            className={styles.resetButton}
            onClick={resetFilters}
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>

      <div className={styles.catalogToolbar}>
        <p>
          <strong>{filteredProjects.length}</strong> projet(s) correspondent aux
          filtres actuels.
        </p>
        <div className={styles.viewSwitch}>
          <button
            type="button"
            className={
              viewMode === 'list'
                ? styles.viewSwitchActive
                : styles.viewSwitchButton
            }
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
          >
            <List />
            Liste
          </button>
          <button
            type="button"
            className={
              viewMode === 'grid'
                ? styles.viewSwitchActive
                : styles.viewSwitchButton
            }
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
          >
            <LayoutGrid />
            Grille
          </button>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div
          className={
            viewMode === 'list'
              ? styles.projectsListLayout
              : styles.projectsGridLayout
          }
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className={
                viewMode === 'list' ? styles.projectArticle : styles.projectCard
              }
            >
              <Link href={project.href} className={styles.projectVisualLink}>
                <img
                  src={
                    viewMode === 'grid'
                      ? project.coverImage.small
                      : project.coverImage.medium
                  }
                  srcSet={`${project.coverImage.small} 640w, ${project.coverImage.medium} 960w, ${project.coverImage.large} 1440w`}
                  sizes={
                    viewMode === 'list'
                      ? '(max-width: 900px) 100vw, 34vw'
                      : '(max-width: 900px) 100vw, 320px'
                  }
                  alt={project.title}
                  className={styles.projectCover}
                />
              </Link>

              <div className={styles.projectBody}>
                <div className={styles.projectHeader}>
                  {project.projectType?.name ? (
                    <span className={styles.projectTypeBadge}>
                      {project.projectType.name}
                    </span>
                  ) : null}
                  <h3>
                    <Link href={project.href}>{project.title}</Link>
                  </h3>
                </div>

                <div className={styles.projectMeta}>
                  {viewMode === 'list' ? (
                    <>
                      <div className={styles.metaInlineBlock}>
                        <Blocks />
                        <span>
                          {project.technologies.length
                            ? project.technologies
                                .map((item) => item.name)
                                .join(', ')
                            : 'Aucune technologie'}
                        </span>
                      </div>
                      <div className={styles.metaInlineBlock}>
                        <ChevronsLeftRightEllipsis />
                        <span>
                          {project.languages.length
                            ? project.languages
                                .map((item) => item.name)
                                .join(', ')
                            : 'Aucun langage'}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.metaBlock}>
                        <TabletSmartphone />
                        <span>
                          {project.projectType?.name || 'Non renseigné'}
                        </span>
                      </div>
                      <div className={styles.metaBlock}>
                        <Blocks />
                        <span>
                          {project.technologies.length
                            ? project.technologies
                                .map((item) => item.name)
                                .join(', ')
                            : 'Aucune technologie'}
                        </span>
                      </div>
                      <div className={styles.metaBlock}>
                        <ChevronsLeftRightEllipsis />
                        <span>
                          {project.languages.length
                            ? project.languages
                                .map((item) => item.name)
                                .join(', ')
                            : 'Aucun langage'}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <p className={styles.projectExcerpt}>
                  {viewMode === 'list'
                    ? project.editorialDescription
                    : project.shortDescription}
                </p>

                <div className={styles.stackCloud}>
                  {project.stack.length ? (
                    project.stack.map((item) => <span key={item}>{item}</span>)
                  ) : (
                    <span>Stack non renseignée</span>
                  )}
                </div>

                <div className={styles.projectActions}>
                  <Link href={project.href} className={styles.projectLink}>
                    En savoir plus
                    <ArrowRight />
                  </Link>
                  {project.githubUrl ? (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.externalLink}
                    >
                      <Github />
                      GitHub
                    </Link>
                  ) : null}
                  {project.isLive ? (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.externalLink}
                    >
                      <ExternalLink />
                      Live
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3>Aucun projet ne correspond à ces filtres</h3>
          <p>
            Essaie une autre combinaison ou utilise le bouton de
            réinitialisation pour afficher de nouveau tout le catalogue.
          </p>
        </div>
      )}
    </div>
  );
}
