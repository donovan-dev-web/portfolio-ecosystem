'use client';

import { useState } from 'react';
import { ProjectAPI } from '@/frontend/api/project.api';
import { useProjects } from '@/frontend/hooks/useProjects';

export default function PostProjectComponent() {
  const { refresh } = useProjects();
  const [title, setTitle] = useState('');

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Non authentifié');

    await ProjectAPI.create(
      {
        title,
        order: 0,
        projectType: '',
        technologies: [],
        languages: [],
        shortDescription: '',
        coverImage: '',
        presentation: {
          description: '',
          context: '',
          objectives: '',
          skills: '',
          results: '',
          improvements: '',
        },
      },
      token
    );

    await refresh();
    setTitle('');
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre du projet"
      />
      <button onClick={handleSubmit}>Créer</button>
    </div>
  );
}
