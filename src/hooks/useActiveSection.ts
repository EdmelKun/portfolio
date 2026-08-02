import { useEffect, useState } from 'react'

export function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sections = hrefs
      .map((href) => document.getElementById(href.slice(1)))
      .filter((node): node is HTMLElement => node !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return

        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b,
        )
        setActive(`#${topmost.target.id}`)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [hrefs])

  return active
}
