import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

type Tone = 'gold' | 'cardinal' | 'neutral'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

// Gold never appears as plain text on white (fails contrast) — it's always
// paired with a dark background/outline per the design system rules.
const toneClasses: Record<Tone, string> = {
  gold: 'bg-gold text-rich-black border border-rich-black/10',
  cardinal: 'border border-cardinal text-cardinal bg-white',
  neutral: 'bg-gray-30/30 text-gray-70',
}

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide',
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  )
}
