import clsx from 'clsx'
import { Users, Briefcase, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import type { Mode } from '../../types'
import { OnboardingLayout } from './OnboardingLayout'

const MODES: { value: Mode; label: string; description: string; icon: typeof Users }[] = [
  {
    value: 'casual',
    label: 'Casual',
    description: 'Grab a meal, make a new friend, no pressure.',
    icon: Users,
  },
  {
    value: 'business',
    label: 'Business / Networking',
    description: 'Meet people in your industry or field of interest.',
    icon: Briefcase,
  },
  {
    value: 'dating',
    label: 'Dating',
    description: 'Meet someone one-on-one, on your own terms.',
    icon: Heart,
  },
]

export function ModeSelectPage() {
  const setMode = useAppStore((s) => s.setMode)
  const navigate = useNavigate()

  function choose(mode: Mode) {
    setMode(mode)
    navigate('/explore')
  }

  return (
    <OnboardingLayout
      title="What are you here for today?"
      subtitle="You can change this anytime from your profile."
    >
      <div className="flex flex-col gap-3">
        {MODES.map(({ value, label, description, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => choose(value)}
            className={clsx(
              'flex min-h-11 items-center gap-4 rounded-xl border border-gray-30 bg-white p-4 text-left transition-colors',
              'hover:border-cardinal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cardinal',
            )}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cardinal/10 text-cardinal">
              <Icon size={22} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-base font-semibold">{label}</span>
              <span className="block text-sm text-gray-70">{description}</span>
            </span>
          </button>
        ))}
      </div>
    </OnboardingLayout>
  )
}
