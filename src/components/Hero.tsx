import { content } from '../content'
import { Motif } from './Motif'

const linkClass =
  'link-sweep font-mono text-sm text-ink-secondary hover:text-client'

export function Hero() {
  const { site, hero } = content

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="flex min-h-[88svh] flex-col justify-center gap-6 pt-16 pb-20"
    >
      <p className="font-mono text-xs tracking-[0.2em] text-client uppercase">
        {site.role}
      </p>

      <h1 className="font-mono text-4xl leading-[1.05] font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
        {hero.headline}
      </h1>

      <p className="font-mono text-sm text-ink-muted">{site.bioLine}</p>

      <p className="max-w-[62ch] leading-relaxed text-ink-secondary sm:text-lg">
        {hero.lede}
      </p>

      <Motif nodes={hero.motifNodes} />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={`mailto:${site.email}`}
          className="rounded-sm border border-client/40 bg-client/10 px-4 py-2 font-mono text-sm text-client transition duration-300 ease-out hover:-translate-y-0.5 hover:border-client/70 hover:bg-client/20"
        >
          email me
        </a>
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
        <span className="font-mono text-xs text-ink-muted sm:ml-auto">
          {site.location} · {site.availability}
        </span>
      </div>
    </section>
  )
}
