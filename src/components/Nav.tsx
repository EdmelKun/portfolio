import { useEffect, useState } from 'react'
import { content } from '../content'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? 'border-hairline bg-ground-top/85 backdrop-blur'
          : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <a
          href="#top"
          className="font-mono text-sm font-semibold tracking-[0.1em] text-ink"
        >
          EJL
        </a>

        <nav aria-label="Sections">
          <ul className="flex items-center gap-4 sm:gap-7">
            {content.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-mono text-xs text-ink-secondary transition-colors hover:text-client sm:text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
