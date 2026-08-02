import { content } from '../content'
import { Chip } from './Chip'
import { Section } from './Section'

export function Stack() {
  return (
    <Section id="stack" index="02" title="stack">
      <dl className="flex flex-col gap-8">
        {content.stack.map((group) => (
          <div
            key={group.layer}
            className="grid gap-3 sm:grid-cols-[6rem_1fr] sm:gap-8"
          >
            <dt className="pt-1 font-mono text-xs tracking-[0.14em] text-ink-muted uppercase">
              {group.label}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Chip key={item} label={item} layer={group.layer} />
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
