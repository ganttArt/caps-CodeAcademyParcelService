'use strict';

require('dotenv').config();
const client = require('socket.io-client');
const socket = client.connect(`http://localhost:${process.env.QUEUE_SERVER}/caps`);

const storeId = '1-206-flowers';
let eventName = 'test-event-name2';

socket.emit('getAll',
  {
    storeId: storeId,
    eventName: eventName,
  }
);

socket.on('delivered', payload => {
  console.log('custom message', payload);
  caps.emit('received', payload);
})
