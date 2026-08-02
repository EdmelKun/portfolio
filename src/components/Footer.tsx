import { content } from '../content'

export function Footer() {
  return (
    <footer className="border-t border-hairline py-8">
      <p className="font-mono text-xs text-ink-muted">
        {content.site.name} · {content.site.role}
      </p>
    </footer>
  )
}
