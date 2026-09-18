import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MatchCard } from '../components/MatchCard'
import { RateMealForm } from '../components/RateMealForm'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { mockProfiles } from '../data/profiles'
import { getTopMatches } from '../lib/matching'
import { roomIdFor } from '../lib/chat'
import { useAppStore } from '../store/useAppStore'

export function MatchesPage() {
  const profile = useAppStore((s) => s.profile)
  const tier = useAppStore((s) => s.tier)
  const acceptedMatchIds = useAppStore((s) => s.acceptedMatchIds)
  const declinedMatchIds = useAppStore((s) => s.declinedMatchIds)
  const acceptMatch = useAppStore((s) => s.acceptMatch)
  const declineMatch = useAppStore((s) => s.declineMatch)
  const ratings = useAppStore((s) => s.ratings)
  const rateMatch = useAppStore((s) => s.rateMatch)
  const navigate = useNavigate()
  const [ratingFormFor, setRatingFormFor] = useState<string | null>(null)

  const allCandidates = useMemo(
    () => getTopMatches(profile, mockProfiles),
    [profile],
  )

  const newCandidates = allCandidates.filter(
    (m) => !acceptedMatchIds.includes(m.profile.id) && !declinedMatchIds.includes(m.profile.id),
  )
  const visibleCandidates = tier === 'paid' ? newCandidates : newCandidates.slice(0, 1)

  const acceptedProfiles = mockProfiles.filter((p) => acceptedMatchIds.includes(p.id))

  function handleAccept(profileId: string) {
    acceptMatch(profileId)
    navigate(`/dms/${roomIdFor(profile.id, profileId)}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[32px] font-bold leading-10">Matches</h1>

      {acceptedProfiles.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Your matches</h2>
          <div className="flex flex-col gap-2">
            {acceptedProfiles.map((p) => {
              const rated = ratings[p.id]
              return (
                <Card key={p.id} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold"
                        style={{ backgroundColor: p.avatarColor }}
                        aria-hidden="true"
                      >
                        {p.name.charAt(0)}
                      </span>
                      <span className="text-base font-medium">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/dms/${roomIdFor(profile.id, p.id)}`)}
                        className="min-h-11 rounded-lg border border-cardinal px-3.5 text-sm font-semibold text-cardinal focus-visible:outline focus-visible:outline-2 focus-visible:outline-cardinal"
                      >
                        Message
                      </button>
                      {!rated && (
                        <button
                          onClick={() =>
                            setRatingFormFor(ratingFormFor === p.id ? null : p.id)
                          }
                          className="min-h-11 rounded-lg px-3.5 text-sm font-semibold text-gray-70 hover:text-cardinal focus-visible:outline focus-visible:outline-2 focus-visible:outline-cardinal"
                        >
                          Rate meal
                        </button>
                      )}
                    </div>
                  </div>
                  {rated && <Badge tone="gold">Thanks for rating your meal!</Badge>}
                  {ratingFormFor === p.id && !rated && (
                    <RateMealForm
                      otherName={p.name}
                      onCancel={() => setRatingFormFor(null)}
                      onSubmit={(companion, venue) => {
                        rateMatch(p.id, companion, venue)
                        setRatingFormFor(null)
                      }}
                    />
                  )}
                </Card>
              )
            })}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">
          {tier === 'paid' ? 'New matches' : "You're matched!"}
        </h2>

        {visibleCandidates.length === 0 && (
          <Card className="text-center text-gray-70">
            No matches nearby right now, try widening your radius or checking back later.
          </Card>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {visibleCandidates.map((candidate) => (
            <MatchCard
              key={candidate.profile.id}
              candidate={candidate}
              canDecline={tier === 'paid'}
              onAccept={() => handleAccept(candidate.profile.id)}
              onDecline={() => declineMatch(candidate.profile.id)}
            />
          ))}
        </div>

        {tier === 'free' && (
          <Card className="border-dashed text-center text-sm text-gray-70">
            Sponsored — Upgrade to Paid to see more matches and skip the ones that aren&apos;t
            a fit.
          </Card>
        )}
      </section>
    </div>
  )
}
