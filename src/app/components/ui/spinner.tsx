export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-gold/20 border-t-gold ${className}`}
      style={{ width: 40, height: 40 }}
    />
  )
}
