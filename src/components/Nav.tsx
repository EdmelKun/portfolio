import { useEffect, useState } from 'react'
import { content } from '../content'
import { useActiveSection } from '../hooks/useActiveSection'

const navHrefs = content.nav.map((item) => item.href)

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(navHrefs)

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
          className="link-sweep font-mono text-sm font-semibold tracking-widest text-ink"
        >
          EJL
        </a>

        <nav aria-label="Sections">
          <ul className="flex items-center gap-4 sm:gap-7">
            {content.nav.map((item) => {
              const isActive = active === item.href
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`link-sweep font-mono text-xs sm:text-sm ${
                      isActive
                        ? 'text-client'
                        : 'text-ink-secondary hover:text-client'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
