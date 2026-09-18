export function roomIdFor(a: string, b: string) {
  return ['dm', ...[a, b].sort()].join('-')
}
