'use client';

import { useProjects } from '@/frontend/hooks/useProjects';
import styles from '@/app/projects/projects.module.scss';

export default function GetProjectsComponent() {
  const { projects } = useProjects();

  return (
    <div className={styles.container}>
      {projects.map((project) => (
        <div key={project._id} className={styles.card}>
          <h3>{project.title}</h3>
          <p>{project.shortDescription}</p>
        </div>
      ))}
    </div>
  );
}
