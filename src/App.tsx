import { content } from './content'

export default function App() {
  const { site, hero, work, experience } = content

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-5 px-6 py-24">
      <p className="font-mono text-xs tracking-[0.2em] text-client uppercase">
        {site.role}
      </p>

      <h1 className="font-mono text-4xl font-semibold text-ink sm:text-6xl">
        {hero.headline}
      </h1>

      <p className="font-mono text-sm text-ink-muted">{site.bioLine}</p>

      <p className="max-w-[62ch] text-ink-secondary">{hero.lede}</p>

      <hr className="border-hairline" />

      <p className="font-mono text-xs text-ink-muted">
        <span className="text-client">{hero.motifNodes.join(' → ')}</span>
        {' · '}
        <span className="text-server">
          {work.length} projects, {experience.length} history rows
        </span>
        {' · '}
        {site.location}
      </p>
    </main>
  )
}
