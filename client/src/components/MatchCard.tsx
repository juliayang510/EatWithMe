import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { RestaurantSummary } from './RestaurantSummary'
import type { MatchCandidate } from '../types'

const MODE_LABEL: Record<string, string> = {
  casual: 'Casual',
  business: 'Business/Networking',
  dating: 'Dating',
}

export function MatchCard({
  candidate,
  canDecline,
  onAccept,
  onDecline,
}: {
  candidate: MatchCandidate
  canDecline: boolean
  onAccept: () => void
  onDecline?: () => void
}) {
  const { profile, restaurant, sharedCuisines } = candidate

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white"
          style={{ backgroundColor: profile.avatarColor }}
          aria-hidden="true"
        >
          {profile.name.charAt(0)}
        </span>
        <div className="flex flex-col">
          <span className="text-base font-semibold">
            {profile.name} <span className="font-normal text-gray-70">· {profile.year}</span>
          </span>
          <Badge tone="cardinal">{MODE_LABEL[profile.mode]}</Badge>
        </div>
      </div>

      <p className="text-sm text-gray-70">{profile.bio}</p>

      {sharedCuisines.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {sharedCuisines.map((c) => (
            <span
              key={c}
              className="rounded-full border border-gray-30 px-2.5 py-0.5 text-xs font-medium capitalize text-rich-black"
            >
              {c}
            </span>
          ))}
        </div>
      )}

      <RestaurantSummary restaurant={restaurant} />

      <div className="flex gap-2 pt-1">
        <Button onClick={onAccept} className="flex-1">
          Match
        </Button>
        {canDecline && (
          <Button variant="secondary" onClick={onDecline} className="flex-1">
            Decline
          </Button>
        )}
      </div>
    </Card>
  )
}
