'use client';

import { TagsAPI } from '@/frontend/api/tags.api';

export default function ModifyOneTagsComponent() {
  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    await TagsAPI.update(
      'project-types',
      'ID_A_MODIFIER',
      { name: 'Updated Name', icon: 'new-icon' },
      token
    );
  };

  return <button onClick={handleUpdate}>Modify Project Type</button>;
}
