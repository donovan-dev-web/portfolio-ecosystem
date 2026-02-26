'use client';

import { useState } from 'react';
import { TagsAPI } from '@/frontend/api/tags.api';

export default function GetOneTagComponent() {
  const [result, setResult] = useState<any>(null);

  const fetchOne = async () => {
    const data = await TagsAPI.getOne('languages', 'ID_A_TESTER');
    setResult(data);
  };

  return (
    <div>
      <button onClick={fetchOne}>Get One Language</button>
      {result && <p>{result.name}</p>}
    </div>
  );
}
