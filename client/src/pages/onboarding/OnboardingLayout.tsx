import type { ReactNode } from 'react'

export function OnboardingLayout({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-white px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center text-2xl font-bold text-cardinal">Eat With Me</div>
        <h1 className="text-[32px] font-bold leading-10">{title}</h1>
        {subtitle && <p className="mt-1 text-base text-gray-70">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
