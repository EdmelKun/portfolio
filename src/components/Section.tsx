import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  index: string
  title: string
  children: ReactNode
}

export function Section({ id, index, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-hairline py-16 sm:py-24"
    >
      <h2 className="mb-10 font-mono text-xs tracking-[0.2em] text-ink-muted uppercase">
        <span className="text-client">{index}</span> / {title}
      </h2>
      {children}
    </section>
  )
}
