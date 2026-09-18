import { MapPin, MessageCircle, User, Utensils } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { to: '/explore', label: 'Explore', icon: MapPin },
  { to: '/matches', label: 'Matches', icon: Utensils },
  { to: '/dms', label: 'DMs', icon: MessageCircle },
  { to: '/profile', label: 'Groups/Profile', icon: User },
]
