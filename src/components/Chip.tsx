import type { Layer } from '../content'

const layerClass: Record<Layer, string> = {
  client:
    'border-client/40 bg-client/10 text-client group-hover:border-client/70 group-hover:bg-client/20',
  server:
    'border-server/40 bg-server/10 text-server group-hover:border-server/70 group-hover:bg-server/20',
  platform:
    'border-hairline text-ink-secondary group-hover:border-ink-muted group-hover:text-ink',
}

type ChipProps = {
  label: string
  layer: Layer
}

export function Chip({ label, layer }: ChipProps) {
  return (
    <li
      className={`rounded-sm border px-2 py-1 font-mono text-[0.7rem] transition-colors duration-300 ${layerClass[layer]}`}
    >
      {label}
    </li>
  )
}
