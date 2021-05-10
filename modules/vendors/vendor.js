'use strict';

const faker = require('faker');
require('dotenv').config();

const io = require('socket.io-client');

const socket = io.connect(`${process.env.HOST}/caps`);

const store = '1-800-flowerz';

socket.emit('join', store)

setInterval(() => {
  let newCustomerOrder = {
    store: store,
    orderId: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: [
      faker.address.streetAddress(),
      faker.address.streetSuffix() + ',',
      faker.address.secondaryAddress() + ',',
      faker.address.city() + ',',
      faker.address.state(),
      faker.address.zipCode()
    ].join(' ')
  }

  socket.emit('pickup', newCustomerOrder);
}, 500);

socket.on('delivered', payload => {
  console.log(`thank you for delivering ${payload.orderId}`);
})
