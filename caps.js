'use strict';

require('dotenv').config();

const io = require('socket.io')(process.env.PORT);

const caps = io.of('/caps');

caps.on('connection', socket => {
  console.log('client:', socket.id);
  console.log(socket);

  socket.on('pickup', payload => {
    let pickupEvent = {
      event: 'pickup',
      time: new Date(),
      payload: payload
    };
    console.log('EVENT ' + JSON.stringify(pickupEvent, 0, 2));
    socket.broadcast.emit('pickup', pickupEvent);
  })

  socket.on('in-transit', payload => {
    console.log('in transit');
    console.log('socket id', socket.id);
    payload.vendor = payload.payload.storeId;
    socket.broadcast.emit('in-transit', payload);
  })

  socket.on('delivered', payload => {
    console.log('delivered');
    console.log('socket id', socket.id);
    payload.vendor = payload.payload.storeId;
    socket.broadcast.emit('delivered', payload);
  })
});
