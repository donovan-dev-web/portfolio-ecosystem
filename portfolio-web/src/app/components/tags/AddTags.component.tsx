'use client';

import { useState } from 'react';
import { TagsAPI } from '@/frontend/api/tags.api';
import { useTags } from '@/frontend/hooks/useTags';

export default function AddTagsComponent() {
  const { refresh } = useTags();
  const [name, setName] = useState('');

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    await TagsAPI.create('technology', { name, icon: 'default-icon' }, token);

    await refresh('technology');
    setName('');
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAdd}>Add Technology</button>
    </div>
  );
}
