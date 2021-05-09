'use strict';

require('dotenv').config();

const io = require('socket.io')(process.env.PORT);

const caps = io.of('/caps');

caps.on('connection', socket => {
  console.log('connected client:', socket.id);

  socket.on('join', room => {
    socket.join(room);
  })

  socket.on('pickup', payload => {
    logger('pickup', payload);
    caps.emit('pickup', payload);
  })

  socket.on('in-transit', payload => {
    logger('in-transit', payload);
    caps.to(payload.store).emit('in-transit', payload);
  })

  socket.on('delivered', payload => {
    logger('delivered', payload);
    caps.to(payload.store).emit('delivered', payload);
  })
});

function logger(event, payload) {
  let timestamp = new Date();
  console.log({ timestamp, event, payload }); 
}
