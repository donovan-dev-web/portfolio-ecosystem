import { useEffect } from 'react'

interface Props<T extends string> {
  order: readonly T[]
  current: T
  onChange: (next: T) => void
}

export function useSectionScroll<T extends string>({
  order,
  current,
  onChange,
}: Props<T>) {
  useEffect(() => {
    let locked = false
    const index = order.indexOf(current)

    const move = (direction: number) => {
      if (locked) return
      const nextIndex = index + direction
      if (nextIndex < 0 || nextIndex >= order.length) return

      locked = true
      onChange(order[nextIndex])
      setTimeout(() => (locked = false), 800)
    }

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) move(1)
      else move(-1)
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') move(1)
      if (e.key === 'ArrowUp') move(-1)
    }

    window.addEventListener('wheel', onWheel)
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [current, order, onChange])
}
