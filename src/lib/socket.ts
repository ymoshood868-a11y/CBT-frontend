import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000', {
      autoConnect: false,
      withCredentials: true,
    })
  }
  return socket
}

export const connectSocket = (token: string) => {
  const socket = getSocket()
  socket.auth = { token }
  socket.connect()
  return socket
}

export const disconnectSocket = () => {
  socket?.disconnect()
  socket = null
}
