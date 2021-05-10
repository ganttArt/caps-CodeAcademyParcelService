'use strict';

require('dotenv').config();
const io = require('socket.io')(process.env.QUEUE_SERVER);

const caps = io.of('/caps');

const queue = {};

caps.on('connection', socket => {
  console.log('connected to caps queue server', socket);
  
  socket.on('received', payload => {
    delete queue[payload.store][payload.eventName][payload.messageId];
    console.log('deleted received message from queue')
  })

  socket.on('getAll', payload => {
    Object.keys(queue[payload.store][payload.eventName]).forEach(messageId => {
      socket.emit(queue[payload.store][payload.eventName][messageId]);
    })
  })

  socket.on('delivered', payload => {
    queue[payload.store]['delivered'][payload.messageId] = payload.message;

    caps.emit({
      messageId: payload.messageId,
      payload: payload
    })
  })
})