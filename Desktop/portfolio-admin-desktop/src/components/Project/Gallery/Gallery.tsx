// src/components/Project/Gallery.tsx
import { Card } from '../Cards/Card'
import style from './Gallery.module.scss'

export const Gallery = ({ projects }: { projects: any[] }) => (
  <div className={style.gallery}>
    {projects.map((p) => (
      <Card key={p._id} project={p} />
    ))}
  </div>
)
