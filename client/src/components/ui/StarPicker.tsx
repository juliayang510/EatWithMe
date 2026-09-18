import { useState } from 'react'
import { Star } from 'lucide-react'

export function StarPicker({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  const display = hovered ?? value

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex gap-1" onMouseLeave={() => setHovered(null)}>
        {Array.from({ length: 5 }, (_, i) => {
          const starValue = i + 1
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(starValue)}
              onMouseEnter={() => setHovered(starValue)}
              className="flex h-11 w-11 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-cardinal"
              aria-label={`${starValue} star${starValue > 1 ? 's' : ''} for ${label}`}
              aria-pressed={value >= starValue}
            >
              <Star
                size={22}
                className={starValue <= display ? 'fill-gold text-rich-black/70' : 'fill-none text-gray-30'}
                strokeWidth={1.5}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
