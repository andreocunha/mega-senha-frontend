import socketIOClient from 'socket.io-client'

const socket = socketIOClient("http://localhost:4000/")

/* https://scuba-senha.herokuapp.com/ */

export default socket;