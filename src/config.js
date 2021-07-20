import io  from 'socket.io-client'

// export const socket = io.connect('http://3.7.6.81', {
//   transports: ['websockets'], 
//   pollingDuration: 10,
//   // upgrade: false,
//   reconnect:true,
//   secure: true,
//   path: '/api',
//   rejectUnauthorized: false,
//   logLevel:1,
// })

// const config= {
//     apiUrl: 'http://3.7.6.81/api',
//     redirecturl:"http://localhost:3000"
// }

export const socket = io('http://localhost:5000', {
  transports: ['websocket'], 
  upgrade: false
})

const config= {
    apiUrl: 'http://localhost:5000',
    redirecturl:"http://localhost:3000"
}
// const config= {
//   apiUrl: 'http://3.7.6.81/api',
//   redirecturl:"http://3.7.6.81/"
// }
// export const socket = io('http://3.7.6.81', {
// transports: ['websocket'], 
// upgrade: false
// })


export default config;