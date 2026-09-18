import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useAppStore } from '../../store/useAppStore'
import { OnboardingLayout } from './OnboardingLayout'

export function SignInPage() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated)
  const signIn = useAppStore((s) => s.signIn)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) return <Navigate to="/onboarding/profile" replace />

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const result = signIn(email)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setError(null)
    navigate('/onboarding/profile')
  }

  return (
    <OnboardingLayout
      title="Verify your student email"
      subtitle="We use your @usc.edu email to keep the community trusted and safe."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <label className="flex flex-col gap-1.5 text-left">
          <span className="text-sm font-medium text-rich-black">USC email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@usc.edu"
            aria-invalid={!!error}
            aria-describedby={error ? 'email-error' : undefined}
            className="min-h-11 rounded-lg border border-gray-30 px-3.5 py-2 text-base outline-none focus:border-cardinal focus:ring-2 focus:ring-cardinal/20"
          />
        </label>
        {error && (
          <p id="email-error" role="alert" className="text-sm text-cardinal">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </OnboardingLayout>
  )
}
