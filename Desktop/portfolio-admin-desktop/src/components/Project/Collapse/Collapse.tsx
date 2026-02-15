// src/components/Global/Collapse/Collapse.tsx
import { useState } from 'react'
import style from './Collapse.module.scss'

export const Collapse = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={style.collapse}>
      <div className={style.header} onClick={() => setOpen(!open)}>
        <h3>{title}</h3>
        <span>{open ? '-' : '+'}</span>
      </div>
      {open && <div className={style.content}>{children}</div>}
    </div>
  )
}
