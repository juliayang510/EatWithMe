import { useEffect, useRef, useState } from 'react'
import { socket } from './socket'
import type { ChatMessage } from '../types'

export type ChatStatus = 'connecting' | 'connected' | 'reconnecting' | 'error'

export function useChatRoom(roomId: string | undefined) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [status, setStatus] = useState<ChatStatus>(socket.connected ? 'connected' : 'connecting')
  const hasConnectedOnce = useRef(socket.connected)

  useEffect(() => {
    if (!roomId) return

    if (!socket.connected) socket.connect()

    function handleHistory(history: ChatMessage[]) {
      setMessages(history)
    }
    function handleMessage(message: ChatMessage) {
      setMessages((prev) => [...prev, message])
    }
    function handleConnect() {
      hasConnectedOnce.current = true
      setStatus('connected')
      socket.emit('join-room', roomId)
    }
    function handleDisconnect() {
      setStatus('reconnecting')
    }
    function handleConnectError() {
      setStatus(hasConnectedOnce.current ? 'reconnecting' : 'error')
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleConnectError)
    socket.on('history', handleHistory)
    socket.on('message', handleMessage)

    if (socket.connected) socket.emit('join-room', roomId)

    return () => {
      socket.emit('leave-room', roomId)
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('connect_error', handleConnectError)
      socket.off('history', handleHistory)
      socket.off('message', handleMessage)
    }
  }, [roomId])

  function sendMessage(senderId: string, senderName: string, text: string) {
    if (!roomId || !text.trim()) return
    socket.emit('send-message', { roomId, senderId, senderName, text: text.trim() })
  }

  return { messages, status, sendMessage }
}
