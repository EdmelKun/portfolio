import './Motif.css'

type MotifProps = {
  nodes: readonly [string, string, string]
}

export function Motif({ nodes }: MotifProps) {
  return (
    <div className="motif" aria-hidden="true">
      <div className="motif-track">
        <span className="motif-rail" />
        <span className="motif-pulse motif-pulse-request" />
        <span className="motif-pulse motif-pulse-response" />
        {nodes.map((node, index) => (
          <span key={node} className={`motif-node motif-node-${index}`}>
            <span className="motif-dot" />
            <span className="motif-ring motif-ring-client" />
            <span className="motif-ring motif-ring-server" />
            <span className="motif-label">{node}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
