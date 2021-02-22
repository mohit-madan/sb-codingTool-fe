import io from 'socket.io-client'
export const socket = io.connect('http://localhost:5000', {
  transports: ['websocket'], 
  upgrade: false
})

const config= {
    apiUrl: 'http://localhost:5000',
    redirecturl:"http://localhost:3000"
}

export default config;