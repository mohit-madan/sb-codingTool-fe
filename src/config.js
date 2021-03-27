import io  from 'socket.io-client'

export const socket = io.connect('http://3.7.6.81', {
  transports: ['xhr-polling'], 
  pollingDuration: 10,
  upgrade: false,
  // reconnect:true,
  secure: true,
  path: '/api',
  // rejectUnauthorized: false,
  logLevel:1,
})

const config= {
    apiUrl: 'http://3.7.6.81/api',
    redirecturl:"http://localhost:3000"
}

export default config;