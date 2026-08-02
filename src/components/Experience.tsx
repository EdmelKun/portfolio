import { content, type Experience as ExperienceRow } from '../content'
import { Section } from './Section'

function Row({ row }: { row: ExperienceRow }) {
  return (
    <li className="grid gap-2 border-t border-hairline py-6 first:border-t-0 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-8">
      <p className="pt-1 font-mono text-xs text-ink-muted">
        {row.start} — {row.end}
      </p>

      <div className="flex flex-col gap-1">
        <h3 className="font-mono text-base text-ink">{row.org}</h3>

        <p className="text-sm text-ink-secondary">
          {row.role}
          {row.arrangement && (
            <span className="text-ink-muted"> · {row.arrangement}</span>
          )}
          {row.kind === 'education' && (
            <span className="text-ink-muted"> · education</span>
          )}
        </p>

        {row.detail && <p className="text-sm text-ink-muted">{row.detail}</p>}

        {row.projects && (
          <ul className="mt-4 flex flex-col gap-4 border-l border-hairline pl-4">
            {row.projects.map((project) => (
              <li key={project.name} className="flex flex-col gap-1">
                <p className="font-mono text-sm text-ink">
                  {project.name}
                  <span className="text-xs text-ink-muted">
                    {' '}
                    {project.start} — {project.end}
                  </span>
                </p>
                <p className="text-sm text-ink-secondary">{project.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

export function Experience() {
  return (
    <Section id="experience" index="03" title="experience">
      <ol className="flex flex-col">
        {content.experience.map((row) => (
          <Row key={`${row.org}-${row.start}`} row={row} />
        ))}
      </ol>
    </Section>
  )
}
