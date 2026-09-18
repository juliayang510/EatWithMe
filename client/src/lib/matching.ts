import { restaurants } from '../data/restaurants'
import type { MatchCandidate, Profile, Restaurant } from '../types'

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

function sharedCuisines(a: Profile, b: Profile) {
  return a.preferences.cuisines.filter((c) => b.preferences.cuisines.includes(c))
}

function sharedCost(a: Profile, b: Profile) {
  return a.preferences.cost.some((c) => b.preferences.cost.includes(c))
}

/**
 * Rule-based mock matchmaking score, 0-100. Mode must match (a Casual user
 * only sees Casual candidates, etc). The rest rewards shared cuisine/budget
 * and penalizes distance, mirroring "preference, location, and mode" from
 * the design brief without needing a live backend.
 */
export function scoreCandidate(user: Profile, candidate: Profile): number {
  if (candidate.mode !== user.mode) return -1

  const shared = sharedCuisines(user, candidate)
  const distanceKm = haversineKm(user.location, candidate.location)

  let score = 0
  score += shared.length * 18
  score += sharedCost(user, candidate) ? 15 : 0
  score += Math.max(0, 10 - distanceKm * 10) // closer users score higher
  score += Math.min(candidate.rating, 5) * 4
  score += Math.abs(user.preferences.partySize - candidate.preferences.partySize) === 0 ? 5 : 0

  return Math.round(score)
}

function restaurantScore(restaurant: Restaurant, user: Profile, candidate: Profile) {
  const midpoint = {
    lat: (user.location.lat + candidate.location.lat) / 2,
    lng: (user.location.lng + candidate.location.lng) / 2,
  }
  const likesCuisine =
    user.preferences.cuisines.includes(restaurant.cuisine) ||
    candidate.preferences.cuisines.includes(restaurant.cuisine)
  const costOk =
    user.preferences.cost.includes(restaurant.cost) ||
    candidate.preferences.cost.includes(restaurant.cost)

  let score = restaurant.rating * 10
  score += likesCuisine ? 30 : 0
  score += costOk ? 15 : 0
  score -= haversineKm(midpoint, restaurant.location) * 8
  return score
}

export function recommendRestaurant(user: Profile, candidate: Profile): Restaurant {
  return [...restaurants].sort(
    (a, b) => restaurantScore(b, user, candidate) - restaurantScore(a, user, candidate),
  )[0]
}

export function getTopMatches(
  user: Profile,
  pool: Profile[],
  limit = 6,
): MatchCandidate[] {
  return pool
    .filter((candidate) => candidate.id !== user.id)
    .map((candidate) => ({
      profile: candidate,
      score: scoreCandidate(user, candidate),
      sharedCuisines: sharedCuisines(user, candidate),
    }))
    .filter((m) => m.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((m) => ({
      ...m,
      restaurant: recommendRestaurant(user, m.profile),
    }))
}
