import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-gray-30 bg-white p-4 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}
