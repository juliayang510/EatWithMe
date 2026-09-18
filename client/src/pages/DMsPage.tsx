import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { ArrowLeft, Flame } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { mockProfiles } from '../data/profiles'
import { useChatRoom } from '../lib/useChatRoom'
import { useAppStore } from '../store/useAppStore'
import { roomIdFor } from '../lib/chat'

function otherIdFromRoom(roomId: string, myId: string) {
  const parts = roomId.split('-').slice(1)
  return parts.find((id) => id !== myId)
}

function ChatThread({ roomId }: { roomId: string }) {
  const profile = useAppStore((s) => s.profile)
  const recordMessageSent = useAppStore((s) => s.recordMessageSent)
  const streak = useAppStore((s) => s.streaks[roomId])
  const { messages, status, sendMessage } = useChatRoom(roomId)
  const [draft, setDraft] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const otherId = otherIdFromRoom(roomId, profile.id)
  const other = mockProfiles.find((p) => p.id === otherId)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!draft.trim()) return
    sendMessage(profile.id, profile.name || 'You', draft)
    recordMessageSent(roomId)
    setDraft('')
  }

  return (
    <div className="flex h-[calc(100svh-5.5rem)] flex-col md:h-[calc(100svh-2rem)]">
      <div className="flex items-center gap-3 border-b border-gray-30 pb-3">
        <Link
          to="/dms"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-70 hover:text-cardinal md:hidden"
          aria-label="Back to conversations"
        >
          <ArrowLeft size={20} />
        </Link>
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold"
          style={{ backgroundColor: other?.avatarColor ?? '#767676' }}
          aria-hidden="true"
        >
          {other?.name.charAt(0) ?? '?'}
        </span>
        <div className="flex flex-col">
          <span className="text-base font-semibold">{other?.name ?? 'Unknown match'}</span>
          {status === 'connecting' && (
            <span className="text-xs text-gray-70">Connecting…</span>
          )}
          {status === 'reconnecting' && (
            <span className="text-xs text-cardinal">Reconnecting…</span>
          )}
          {status === 'error' && (
            <span className="text-xs text-cardinal">
              Can&apos;t reach the chat server — is it running?
            </span>
          )}
        </div>
        {streak && streak.count > 0 && (
          <Badge tone="gold" className="ml-auto">
            <Flame size={12} aria-hidden="true" /> {streak.count}-day streak
          </Badge>
        )}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto py-3">
        {messages.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-70">
            Say hi to kick off the conversation and lock in a time to eat.
          </p>
        )}
        {messages.map((m) => {
          const mine = m.senderId === profile.id
          return (
            <div key={m.id} className={clsx('flex', mine ? 'justify-end' : 'justify-start')}>
              <div
                className={clsx(
                  'max-w-[75%] rounded-2xl px-3.5 py-2 text-base',
                  mine ? 'bg-cardinal/90 text-white' : 'bg-gray-30/30 text-rich-black',
                )}
              >
                {m.text}
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-gray-30 pt-3">
        <label className="sr-only" htmlFor="chat-input">
          Message
        </label>
        <input
          id="chat-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Message…"
          className="min-h-11 flex-1 rounded-full border border-gray-30 px-4 py-2 text-base outline-none focus:border-cardinal focus:ring-2 focus:ring-cardinal/20"
        />
        <Button type="submit" disabled={!draft.trim()}>
          Send
        </Button>
      </form>
    </div>
  )
}

function Inbox() {
  const profile = useAppStore((s) => s.profile)
  const acceptedMatchIds = useAppStore((s) => s.acceptedMatchIds)
  const streaks = useAppStore((s) => s.streaks)
  const matched = mockProfiles.filter((p) => acceptedMatchIds.includes(p.id))

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[32px] font-bold leading-10">DMs</h1>
      {matched.length === 0 ? (
        <Card className="text-center text-gray-70">
          No conversations yet — match with someone in Matches to start chatting.
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          {matched.map((p) => {
            const roomId = roomIdFor(profile.id, p.id)
            const streak = streaks[roomId]
            return (
              <Link key={p.id} to={`/dms/${roomId}`}>
                <Card className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full text-white font-semibold"
                    style={{ backgroundColor: p.avatarColor }}
                    aria-hidden="true"
                  >
                    {p.name.charAt(0)}
                  </span>
                  <span className="flex-1 text-base font-medium">{p.name}</span>
                  {streak && streak.count > 0 && (
                    <Badge tone="gold">
                      <Flame size={12} aria-hidden="true" /> {streak.count}
                    </Badge>
                  )}
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function DMsPage() {
  const { roomId } = useParams<{ roomId?: string }>()
  return roomId ? <ChatThread roomId={roomId} /> : <Inbox />
}
