export type Mode = 'casual' | 'business' | 'dating'

export type Cuisine =
  | 'american'
  | 'asian'
  | 'italian'
  | 'mexican'
  | 'mediterranean'
  | 'indian'
  | 'korean'
  | 'japanese'
  | 'vegan'
  | 'healthy'

export type CostTier = '$' | '$$' | '$$$'

export interface Preferences {
  cuisines: Cuisine[]
  cost: CostTier[]
  allergies: string[]
  partySize: number
  mood: string
  hobbies: string[]
}

export interface Profile {
  id: string
  name: string
  email: string
  year: string
  bio: string
  avatarColor: string
  preferences: Preferences
  mode: Mode
  location: { lat: number; lng: number }
  rating: number
  streakDays: number
}

export interface Restaurant {
  id: string
  name: string
  cuisine: Cuisine
  cost: CostTier
  location: { lat: number; lng: number }
  address: string
  noise: 'quiet' | 'moderate' | 'lively'
  service: 'casual' | 'attentive' | 'fast'
  size: 'small' | 'medium' | 'large'
  sponsored?: boolean
  rating: number
}

export interface MatchCandidate {
  profile: Profile
  restaurant: Restaurant
  score: number
  sharedCuisines: Cuisine[]
}

export interface ChatMessage {
  id: string
  roomId: string
  senderId: string
  senderName: string
  text: string
  sentAt: string
}
