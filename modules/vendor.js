'use strict';

const faker = require('faker');
require('dotenv').config();

const io = require('socket.io-client');

const capsConnection = io.connect(`${process.env.HOST}/caps`);

setInterval(() => {
  let newCustomerOrder = {
    storeName: process.env.STORE_NAME,
    storeId: process.env.VENDOR_ONE,
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

  capsConnection.emit('pickup', newCustomerOrder);
}, 500);

capsConnection.on('delivered', payload => {
  if (payload.vendor === process.env.VENDOR_ONE) {
    console.log(`thank you for delivering ${payload.payload.orderId}`);
  }
})
