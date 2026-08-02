import { content } from '../content'
import { Section } from './Section'

const linkClass =
  'font-mono text-sm text-ink-secondary transition-colors hover:text-client'

export function Contact() {
  const { site } = content

  return (
    <Section id="contact" index="04" title="contact">
      <div className="flex flex-col gap-8">
        <a
          href={`mailto:${site.email}`}
          className="font-mono text-xl break-words text-ink transition-colors hover:text-client sm:text-3xl"
        >
          {site.email}
        </a>

        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            github ↗
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            linkedin ↗
          </a>
        </div>

        <p className="font-mono text-xs text-ink-muted">
          {site.location} · {site.availability}
        </p>
      </div>
    </Section>
  )
}
