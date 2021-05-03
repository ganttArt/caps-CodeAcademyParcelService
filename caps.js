'use strict';

const events = require('./events');
require('./modules/driver');
require('./modules/vendor');

events.on('pickup', payload => {
  let pickupEvent = { event: 'pickup', time: new Date(), payload: payload };
  console.log('EVENT ' + JSON.stringify(pickupEvent, 0, 2));
})

events.on('in-transit', payload => {
  let inTransitEvent = { event: 'in-transit', time: new Date(), payload: payload };
  console.log('EVENT ' + JSON.stringify(inTransitEvent, 0, 2));
})

events.on('delivered', payload => {
  let deliveredEvent = { event: 'in-transit', time: new Date(), payload: payload };
  console.log('EVENT ' + JSON.stringify(deliveredEvent, 0, 2));
})
