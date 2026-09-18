import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

export function RequireOnboarding({ children }: { children: ReactNode }) {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated)
  const profileComplete = useAppStore((s) => s.profileComplete)
  const modeSelected = useAppStore((s) => s.modeSelected)

  if (!isAuthenticated) return <Navigate to="/sign-in" replace />
  if (!profileComplete) return <Navigate to="/onboarding/profile" replace />
  if (!modeSelected) return <Navigate to="/onboarding/mode" replace />

  return <>{children}</>
}
