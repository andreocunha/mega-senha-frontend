import socketIOClient from 'socket.io-client'

const socket = socketIOClient("https://scuba-senha.herokuapp.com/")

export default socket;