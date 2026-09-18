import { io } from 'socket.io-client'

const CHAT_SERVER_URL = import.meta.env.VITE_CHAT_SERVER_URL ?? 'http://localhost:4000'

export const socket = io(CHAT_SERVER_URL, { autoConnect: false })
