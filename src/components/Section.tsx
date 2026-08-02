import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type SectionProps = {
  id: string
  index: string
  title: string
  children: ReactNode
}

export function Section({ id, index, title, children }: SectionProps) {
  const { ref, revealed } = useReveal<HTMLElement>()

  return (
    <section
      id={id}
      ref={ref}
      className={`scroll-mt-20 border-t border-hairline py-16 transition duration-700 ease-out sm:py-24 ${
        revealed ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      <h2 className="mb-10 font-mono text-xs tracking-[0.2em] text-ink-muted uppercase">
        <span className="text-client">{index}</span> / {title}
      </h2>
      {children}
    </section>
  )
}
