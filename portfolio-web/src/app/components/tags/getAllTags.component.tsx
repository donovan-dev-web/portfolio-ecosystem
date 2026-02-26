'use client';

import { useTags } from '@/frontend/hooks/useTags';

export default function GetAllTagsComponent() {
  const { tags } = useTags();

  return (
    <div>
      {Object.entries(tags).map(([category, items]) => (
        <div key={category}>
          <h3>{category}</h3>
          {items.map((tag: any) => (
            <p key={tag._id}>{tag.name}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
