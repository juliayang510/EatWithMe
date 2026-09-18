import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

export function Chip({ selected, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={clsx(
        'inline-flex min-h-11 items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cardinal',
        selected
          ? 'border-cardinal bg-cardinal text-white'
          : 'border-gray-30 bg-white text-rich-black hover:border-cardinal/50',
        className,
      )}
      {...props}
    />
  )
}
