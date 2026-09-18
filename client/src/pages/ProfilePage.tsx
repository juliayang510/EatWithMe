import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { StarRating } from '../components/ui/StarRating'
import { Button } from '../components/ui/Button'
import { useAppStore } from '../store/useAppStore'
import type { Mode } from '../types'

const MODES: { value: Mode; label: string }[] = [
  { value: 'casual', label: 'Casual' },
  { value: 'business', label: 'Business/Networking' },
  { value: 'dating', label: 'Dating' },
]

export function ProfilePage() {
  const profile = useAppStore((s) => s.profile)
  const tier = useAppStore((s) => s.tier)
  const setTier = useAppStore((s) => s.setTier)
  const setMode = useAppStore((s) => s.setMode)
  const signOut = useAppStore((s) => s.signOut)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[32px] font-bold leading-10">Groups / Profile</h1>

      <Card className="flex items-center gap-4">
        <span
          className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-semibold text-white"
          style={{ backgroundColor: profile.avatarColor }}
          aria-hidden="true"
        >
          {profile.name.charAt(0) || '?'}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-xl font-semibold">{profile.name || 'Add your name'}</span>
          <span className="text-sm text-gray-70">
            {profile.year} · {profile.email}
          </span>
          <StarRating value={profile.rating} label={`${profile.rating} star credibility rating`} />
        </div>
      </Card>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Mode</h2>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value)}
              className={clsx(
                'min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors',
                profile.mode === m.value
                  ? 'border-cardinal bg-cardinal text-white'
                  : 'border-gray-30 bg-white text-rich-black hover:border-cardinal/50',
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Membership</h2>
        <Card className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold">
                {tier === 'paid' ? 'Paid' : 'Free'} tier
              </span>
              {tier === 'paid' && <Badge tone="gold">Ad-free</Badge>}
            </div>
            <p className="text-sm text-gray-70">
              {tier === 'paid'
                ? 'Full pairing control, including the option to decline a match.'
                : 'Automatic pairing, no decline option, with ads.'}
            </p>
          </div>
          <Button
            variant={tier === 'paid' ? 'secondary' : 'primary'}
            onClick={() => setTier(tier === 'paid' ? 'free' : 'paid')}
          >
            {tier === 'paid' ? 'Switch to Free' : 'Upgrade to Paid'}
          </Button>
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Preferences</h2>
        <Card className="flex flex-col gap-2 text-sm text-gray-70">
          <span>
            <strong className="text-rich-black">Cuisines:</strong>{' '}
            {profile.preferences.cuisines.join(', ') || 'None set'}
          </span>
          <span>
            <strong className="text-rich-black">Budget:</strong>{' '}
            {profile.preferences.cost.join(', ') || 'None set'}
          </span>
          <span>
            <strong className="text-rich-black">Party size:</strong>{' '}
            {profile.preferences.partySize}
          </span>
          <span>
            <strong className="text-rich-black">Allergies:</strong>{' '}
            {profile.preferences.allergies.join(', ') || 'None'}
          </span>
          <span>
            <strong className="text-rich-black">Hobbies:</strong>{' '}
            {profile.preferences.hobbies.join(', ') || 'None set'}
          </span>
        </Card>
        <Button
          variant="secondary"
          onClick={() => navigate('/onboarding/profile')}
          className="self-start"
        >
          Edit preferences
        </Button>
      </section>

      <Button variant="ghost" onClick={signOut} className="self-start text-gray-70">
        Sign out
      </Button>
    </div>
  )
}
