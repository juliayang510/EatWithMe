import L from 'leaflet'

const FORK_KNIFE_GLYPH = `
  <g stroke="white" stroke-width="1.4" fill="none" stroke-linecap="round">
    <line x1="6" y1="2" x2="6" y2="9" />
    <line x1="4" y1="2" x2="4" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="6" y1="9" x2="6" y2="18" />
    <path d="M14 2c-1.5 0-2.5 1.5-2.5 4s1 4 2.5 4" />
    <line x1="14" y1="2" x2="14" y2="18" />
  </g>
`

/**
 * Cardinal pin for standard restaurants, Gold pin for sponsored/"Happy Hour"
 * partners, per the map-pin rules in the design system doc.
 */
export function restaurantPinIcon(sponsored: boolean, selected: boolean) {
  const fill = sponsored ? '#FFCC00' : '#990000'
  const scale = selected ? 1.15 : 1
  const html = `
    <svg width="${34 * scale}" height="${44 * scale}" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12z" fill="${fill}" stroke="#00000022" stroke-width="0.5"/>
      <g transform="translate(3,3)">${FORK_KNIFE_GLYPH}</g>
    </svg>
  `
  return L.divIcon({
    html,
    className: '',
    iconSize: [34 * scale, 44 * scale],
    iconAnchor: [17 * scale, 44 * scale],
    popupAnchor: [0, -40 * scale],
  })
}
