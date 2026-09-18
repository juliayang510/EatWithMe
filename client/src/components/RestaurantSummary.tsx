import { MapPin } from 'lucide-react'
import { Badge } from './ui/Badge'
import { StarRating } from './ui/StarRating'
import type { Restaurant } from '../types'

export function RestaurantSummary({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-gray-30/10 p-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cardinal text-white">
        <MapPin size={18} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-base font-semibold">{restaurant.name}</span>
          {restaurant.sponsored && <Badge tone="gold">Recommended</Badge>}
        </div>
        <span className="text-sm text-gray-70">
          {restaurant.address} · {restaurant.cost} · {restaurant.cuisine}
        </span>
        <StarRating value={restaurant.rating} label={`${restaurant.rating} star rating for ${restaurant.name}`} />
      </div>
    </div>
  )
}
