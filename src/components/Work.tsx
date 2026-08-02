import { content, type Work as WorkItem } from '../content'
import { Chip } from './Chip'
import { Section } from './Section'

function displayUrl(url: string) {
  const { hostname, pathname } = new URL(url)
  return hostname.replace(/^www\./, '') + pathname.replace(/\/$/, '')
}

function StatusLabel({ status }: { status: WorkItem['status'] }) {
  if (status === 'delivered') {
    return <span className="font-mono text-xs text-ink-muted">delivered</span>
  }

  return (
    <span className="flex items-center gap-2 font-mono text-xs text-ink-muted">
      live
      <span className="size-1.5 rounded-full bg-client" />
    </span>
  )
}

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article className="flex flex-col gap-4 rounded-sm border border-hairline bg-ground-bottom/40 p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-mono text-lg font-semibold text-ink">
          {item.name}
        </h3>
        <StatusLabel status={item.status} />
      </div>

      <p className="text-sm leading-relaxed text-ink-secondary">
        {item.summary}
      </p>

      <ul className="mt-auto flex flex-wrap gap-2 pt-2">
        {item.stack.map((chip) => (
          <Chip key={chip.label} label={chip.label} layer={chip.layer} />
        ))}
      </ul>

      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs text-ink-muted transition-colors hover:text-client"
        >
          {displayUrl(item.url)} ↗
        </a>
      )}
    </article>
  )
}

export function Work() {
  return (
    <Section id="work" index="01" title="selected work">
      <div className="grid gap-5 lg:grid-cols-2">
        {content.work.map((item) => (
          <WorkCard key={item.name} item={item} />
        ))}
      </div>
    </Section>
  )
}
