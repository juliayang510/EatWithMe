import { useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { restaurantPinIcon } from '../components/Map/pinIcon'
import { RestaurantSummary } from '../components/RestaurantSummary'
import { ChipGroup } from '../components/ui/ChipGroup'
import { restaurants } from '../data/restaurants'
import type { CostTier, Cuisine } from '../types'

const USC_CENTER: [number, number] = [34.0224, -118.2851]

const ALL_CUISINES = Array.from(new Set(restaurants.map((r) => r.cuisine))) as Cuisine[]
const ALL_COSTS: CostTier[] = ['$', '$$', '$$$']

function FlyTo({ position }: { position: [number, number] | null }) {
  const map = useMap()
  if (position) map.flyTo(position, 16, { duration: 0.6 })
  return null
}

export function ExplorePage() {
  const [cuisineFilter, setCuisineFilter] = useState<Cuisine[]>([])
  const [costFilter, setCostFilter] = useState<CostTier[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  function toggle<T extends string>(list: T[], value: T, setter: (v: T[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const filtered = useMemo(
    () =>
      restaurants.filter(
        (r) =>
          (cuisineFilter.length === 0 || cuisineFilter.includes(r.cuisine)) &&
          (costFilter.length === 0 || costFilter.includes(r.cost)),
      ),
    [cuisineFilter, costFilter],
  )

  const selected = filtered.find((r) => r.id === selectedId) ?? null
  const flyPosition: [number, number] | null = selected
    ? [selected.location.lat, selected.location.lng]
    : null

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[32px] font-bold leading-10">Explore</h1>

      <div className="flex flex-col gap-2">
        <ChipGroup
          options={ALL_CUISINES}
          selected={cuisineFilter}
          onToggle={(v) => toggle(cuisineFilter, v, setCuisineFilter)}
        />
        <ChipGroup
          options={ALL_COSTS}
          selected={costFilter}
          onToggle={(v) => toggle(costFilter, v, setCostFilter)}
        />
      </div>

      <div className="h-80 overflow-hidden rounded-xl border border-gray-30 sm:h-96">
        <MapContainer
          center={USC_CENTER}
          zoom={15}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyTo position={flyPosition} />
          {filtered.map((r) => (
            <Marker
              key={r.id}
              position={[r.location.lat, r.location.lng]}
              icon={restaurantPinIcon(!!r.sponsored, r.id === selectedId)}
              eventHandlers={{ click: () => setSelectedId(r.id) }}
            >
              <Popup>
                <span className="font-semibold">{r.name}</span>
                <br />
                {r.cuisine} · {r.cost}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div
        className="flex gap-3 overflow-x-auto pb-2"
        role="list"
        aria-label="Nearby restaurants"
      >
        {filtered.map((r) => (
          <button
            key={r.id}
            role="listitem"
            onClick={() => setSelectedId(r.id)}
            className={`min-w-72 shrink-0 rounded-xl border text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cardinal ${
              r.id === selectedId ? 'border-cardinal' : 'border-gray-30'
            }`}
          >
            <RestaurantSummary restaurant={r} />
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="py-4 text-sm text-gray-70">
            No restaurants match those filters, try widening your search.
          </p>
        )}
      </div>
    </div>
  )
}
