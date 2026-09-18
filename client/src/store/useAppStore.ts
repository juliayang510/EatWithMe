import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Mode, Preferences, Profile } from '../types'

const USC_CENTER = { lat: 34.0224, lng: -118.2851 }

function emptyProfile(): Profile {
  return {
    id: 'me',
    name: '',
    email: '',
    year: 'Freshman',
    bio: '',
    avatarColor: '#990000',
    preferences: {
      cuisines: [],
      cost: [],
      allergies: [],
      partySize: 2,
      mood: '',
      hobbies: [],
    },
    mode: 'casual',
    location: USC_CENTER,
    rating: 5,
    streakDays: 0,
  }
}

interface AppState {
  isAuthenticated: boolean
  tier: 'free' | 'paid'
  profileComplete: boolean
  modeSelected: boolean
  profile: Profile
  acceptedMatchIds: string[]
  declinedMatchIds: string[]
  streaks: Record<string, { count: number; lastDate: string }>
  ratings: Record<string, { companion: number; venue: number }>

  signIn: (email: string) => { ok: true } | { ok: false; error: string }
  signOut: () => void
  setTier: (tier: 'free' | 'paid') => void
  updateProfile: (patch: Partial<Omit<Profile, 'preferences'>>) => void
  updatePreferences: (patch: Partial<Preferences>) => void
  completeProfile: () => void
  setMode: (mode: Mode) => void
  acceptMatch: (profileId: string) => void
  declineMatch: (profileId: string) => void
  recordMessageSent: (roomId: string) => void
  rateMatch: (profileId: string, companion: number, venue: number) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      tier: 'free',
      profileComplete: false,
      modeSelected: false,
      profile: emptyProfile(),
      acceptedMatchIds: [],
      declinedMatchIds: [],
      streaks: {},
      ratings: {},

      signIn: (email) => {
        const normalized = email.trim().toLowerCase()
        if (!normalized.endsWith('@usc.edu')) {
          return { ok: false, error: 'Please use your @usc.edu email to verify you’re a USC student.' }
        }
        set((state) => ({
          isAuthenticated: true,
          profile: { ...state.profile, email: normalized },
        }))
        return { ok: true }
      },

      signOut: () =>
        set({
          isAuthenticated: false,
          profileComplete: false,
          modeSelected: false,
          profile: emptyProfile(),
          acceptedMatchIds: [],
          declinedMatchIds: [],
        }),

      setTier: (tier) => set({ tier }),

      updateProfile: (patch) =>
        set((state) => ({ profile: { ...state.profile, ...patch } })),

      updatePreferences: (patch) =>
        set((state) => ({
          profile: {
            ...state.profile,
            preferences: { ...state.profile.preferences, ...patch },
          },
        })),

      completeProfile: () => set({ profileComplete: true }),

      setMode: (mode) =>
        set((state) => ({
          modeSelected: true,
          profile: { ...state.profile, mode },
        })),

      acceptMatch: (profileId) =>
        set((state) => ({
          acceptedMatchIds: state.acceptedMatchIds.includes(profileId)
            ? state.acceptedMatchIds
            : [...state.acceptedMatchIds, profileId],
        })),

      declineMatch: (profileId) =>
        set((state) => ({
          declinedMatchIds: state.declinedMatchIds.includes(profileId)
            ? state.declinedMatchIds
            : [...state.declinedMatchIds, profileId],
        })),

      recordMessageSent: (roomId) =>
        set((state) => {
          const today = new Date().toISOString().slice(0, 10)
          const existing = state.streaks[roomId]
          if (existing?.lastDate === today) return state

          const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)
          const count = existing?.lastDate === yesterday ? existing.count + 1 : 1

          return {
            streaks: { ...state.streaks, [roomId]: { count, lastDate: today } },
          }
        }),

      rateMatch: (profileId, companion, venue) =>
        set((state) => ({
          ratings: { ...state.ratings, [profileId]: { companion, venue } },
        })),
    }),
    {
      name: 'eat-with-me-session',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
