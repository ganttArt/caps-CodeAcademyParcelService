'use strict';

const events = require('../events');
const faker = require('faker');
require('dotenv').config();

setInterval(() => {
  let newCustomerOrder = {
    storeName: process.env.STORE_NAME,
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

  events.emit('pickup', newCustomerOrder);
}, 5000);

events.on('delivered', () => {
  console.log('thank you');
})
