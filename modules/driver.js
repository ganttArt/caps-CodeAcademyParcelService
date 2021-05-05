'use strict';

require('dotenv').config();
const io = require('socket.io-client');

const capsConnection = io.connect(`${process.env.HOST}/caps`);

capsConnection.on('pickup', payload => {
  setTimeout(() => {
    console.log(`picking up ${payload.payload.orderId}`);
    capsConnection.emit('in-transit', payload);
  }, 1500);
  
  setTimeout(() => {
    console.log(`delivered ${payload.payload.orderId}`);
    capsConnection.emit('delivered', payload);
  }, 3000);
})
