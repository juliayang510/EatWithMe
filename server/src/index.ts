import cors from 'cors'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

interface ChatMessage {
  id: string
  roomId: string
  senderId: string
  senderName: string
  text: string
  sentAt: string
}

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173'

const app = express()
app.use(cors({ origin: CLIENT_ORIGIN }))
app.get('/health', (_req, res) => res.json({ ok: true }))

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: CLIENT_ORIGIN },
})

// In-memory message history per room — resets when the server restarts,
// which is fine for a prototype with no persistence requirement yet.
const roomHistory = new Map<string, ChatMessage[]>()

io.on('connection', (socket) => {
  socket.on('join-room', (roomId: string) => {
    socket.join(roomId)
    socket.emit('history', roomHistory.get(roomId) ?? [])
  })

  socket.on('leave-room', (roomId: string) => {
    socket.leave(roomId)
  })

  socket.on(
    'send-message',
    (payload: { roomId: string; senderId: string; senderName: string; text: string }) => {
      const message: ChatMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        roomId: payload.roomId,
        senderId: payload.senderId,
        senderName: payload.senderName,
        text: payload.text,
        sentAt: new Date().toISOString(),
      }
      const history = roomHistory.get(payload.roomId) ?? []
      history.push(message)
      roomHistory.set(payload.roomId, history)
      io.to(payload.roomId).emit('message', message)
    },
  )
})

httpServer.listen(PORT, () => {
  console.log(`Eat With Me chat server listening on http://localhost:${PORT}`)
})
