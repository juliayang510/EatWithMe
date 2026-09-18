import { Star } from 'lucide-react'

export function StarRating({ value, label }: { value: number; label: string }) {
  const rounded = Math.round(value)
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rounded ? 'fill-gold text-rich-black/70' : 'fill-none text-gray-30'}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
      <span className="ml-1 text-sm text-gray-70">{value.toFixed(1)}</span>
    </span>
  )
}
