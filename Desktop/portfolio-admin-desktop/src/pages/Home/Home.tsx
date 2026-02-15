import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useCallback } from 'react'

import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { useSectionScroll } from '../../hooks/useSectionScroll'

// stable (idéalement hors composant)
const sections = {
  hero: Hero,
  about: About,
  contact: Contact,
} as const

const order = ['hero', 'about', 'contact'] as const

type SectionKey = (typeof order)[number]

export function Home() {
  const { section } = useParams<{ section?: SectionKey }>()
  const navigate = useNavigate()

  const current: SectionKey = section ?? 'hero'
  const SectionComponent = sections[current]

  const onSectionChange = useCallback(
    (next: SectionKey) => {
      navigate(`/home/${next}`)
    },
    [navigate],
  )

  // scroll + clavier
  useSectionScroll({
    order: [...order],
    current,
    onChange: onSectionChange,
  })

  // sécurité si URL invalide
  useEffect(() => {
    if (!sections[current]) {
      navigate('/home/hero', { replace: true })
    }
  }, [current, navigate])

  return (
    <AnimatePresence mode="wait">
      <SectionComponent key={current} />
    </AnimatePresence>
  )
}
