'use strict';

require('dotenv').config();
const client = require('socket.io-client');
const socket = client.connect(`http://localhost:${process.env.QUEUE_SERVER}/caps`);

const storeId = 'acme-widgets';
let eventName = 'test-event-name';

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
