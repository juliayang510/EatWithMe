import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { ChipGroup } from '../../components/ui/ChipGroup'
import { useAppStore } from '../../store/useAppStore'
import type { CostTier, Cuisine } from '../../types'
import { OnboardingLayout } from './OnboardingLayout'

const CUISINES: Cuisine[] = [
  'american',
  'asian',
  'italian',
  'mexican',
  'mediterranean',
  'indian',
  'korean',
  'japanese',
  'vegan',
  'healthy',
]

const COSTS: CostTier[] = ['$', '$$', '$$$']

export function ProfileSetupPage() {
  const profile = useAppStore((s) => s.profile)
  const updateProfile = useAppStore((s) => s.updateProfile)
  const updatePreferences = useAppStore((s) => s.updatePreferences)
  const completeProfile = useAppStore((s) => s.completeProfile)
  const navigate = useNavigate()

  const [name, setName] = useState(profile.name)
  const [year, setYear] = useState(profile.year)
  const [cuisines, setCuisines] = useState<Cuisine[]>(profile.preferences.cuisines)
  const [cost, setCost] = useState<CostTier[]>(profile.preferences.cost)
  const [allergies, setAllergies] = useState(profile.preferences.allergies.join(', '))
  const [partySize, setPartySize] = useState(profile.preferences.partySize)
  const [mood, setMood] = useState(profile.preferences.mood)
  const [hobbies, setHobbies] = useState(profile.preferences.hobbies.join(', '))

  function toggle<T extends string>(list: T[], value: T, setter: (v: T[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    updateProfile({ name, year })
    updatePreferences({
      cuisines,
      cost,
      allergies: allergies
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      partySize,
      mood,
      hobbies: hobbies
        .split(',')
        .map((h) => h.trim())
        .filter(Boolean),
    })
    completeProfile()
    navigate('/onboarding/mode')
  }

  const canSubmit = name.trim().length > 0 && cuisines.length > 0 && cost.length > 0

  return (
    <OnboardingLayout
      title="Build your profile"
      subtitle="This is what your matches will see and what powers your recommendations."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="min-h-11 rounded-lg border border-gray-30 px-3.5 py-2 text-base outline-none focus:border-cardinal focus:ring-2 focus:ring-cardinal/20"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Year</span>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="min-h-11 rounded-lg border border-gray-30 px-3.5 py-2 text-base outline-none focus:border-cardinal focus:ring-2 focus:ring-cardinal/20"
          >
            {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad Student'].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Cuisine preferences</legend>
          <ChipGroup
            options={CUISINES}
            selected={cuisines}
            onToggle={(v) => toggle(cuisines, v, setCuisines)}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Budget</legend>
          <ChipGroup options={COSTS} selected={cost} onToggle={(v) => toggle(cost, v, setCost)} />
        </fieldset>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Allergies (comma-separated)</span>
          <input
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="peanuts, shellfish"
            className="min-h-11 rounded-lg border border-gray-30 px-3.5 py-2 text-base outline-none focus:border-cardinal focus:ring-2 focus:ring-cardinal/20"
          />
        </label>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Party size comfort</legend>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPartySize((n) => Math.max(1, n - 1))}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-30 text-lg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-cardinal"
              aria-label="Decrease party size"
            >
              −
            </button>
            <span className="w-6 text-center text-base font-semibold">{partySize}</span>
            <button
              type="button"
              onClick={() => setPartySize((n) => Math.min(8, n + 1))}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-30 text-lg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-cardinal"
              aria-label="Increase party size"
            >
              +
            </button>
          </div>
        </fieldset>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Mood in the moment</span>
          <input
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Craving something quick and healthy"
            className="min-h-11 rounded-lg border border-gray-30 px-3.5 py-2 text-base outline-none focus:border-cardinal focus:ring-2 focus:ring-cardinal/20"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Hobbies &amp; interests (comma-separated)</span>
          <input
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            placeholder="photography, hiking, music"
            className="min-h-11 rounded-lg border border-gray-30 px-3.5 py-2 text-base outline-none focus:border-cardinal focus:ring-2 focus:ring-cardinal/20"
          />
        </label>

        <Button type="submit" disabled={!canSubmit} className="w-full">
          Continue
        </Button>
      </form>
    </OnboardingLayout>
  )
}
