import type { Layer } from '../content'

const layerClass: Record<Layer, string> = {
  client: 'border-client/40 bg-client/10 text-client',
  server: 'border-server/40 bg-server/10 text-server',
  platform: 'border-hairline text-ink-secondary',
}

type ChipProps = {
  label: string
  layer: Layer
}

export function Chip({ label, layer }: ChipProps) {
  return (
    <li
      className={`rounded-sm border px-2 py-1 font-mono text-[0.7rem] ${layerClass[layer]}`}
    >
      {label}
    </li>
  )
}
