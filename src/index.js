const { HID } = require('node-hid');
const Relay = require('./relay');

const vendorId = 0x16c0;
const productId = 0x05df;
const relayId = 0x01;

const device = new HID(vendorId, productId);
const relay = new Relay(device, relayId);

console.log(`state: ${relay.state}`);
relay.switch(!relay.state);
console.log(`state: ${relay.state}`);
