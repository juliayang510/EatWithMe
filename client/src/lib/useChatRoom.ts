import { useEffect, useState } from 'react'
import { socket } from './socket'
import type { ChatMessage } from '../types'

export function useChatRoom(roomId: string | undefined) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [connected, setConnected] = useState(socket.connected)

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
      setConnected(true)
      socket.emit('join-room', roomId)
    }
    function handleDisconnect() {
      setConnected(false)
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('history', handleHistory)
    socket.on('message', handleMessage)

    if (socket.connected) socket.emit('join-room', roomId)

    return () => {
      socket.emit('leave-room', roomId)
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('history', handleHistory)
      socket.off('message', handleMessage)
    }
  }, [roomId])

  function sendMessage(senderId: string, senderName: string, text: string) {
    if (!roomId || !text.trim()) return
    socket.emit('send-message', { roomId, senderId, senderName, text: text.trim() })
  }

  return { messages, connected, sendMessage }
}
