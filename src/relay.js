const OS = require('os');

class Relay {
  constructor(device, id) {
    this._device = device;
    this._id = id;
    this._stateByte = OS.type() === 'Linux' ? 8 : 7;
  }

  switch(state) {
    try {
      this._device.write([0x00, state ? 0xff : 0xfd, this._id, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
    } catch (_) {
      throw new Error('Can not switch a relay to another state');
    }
  }

  get state() {
    try {
      return Boolean(this._device.getFeatureReport(0x00, 9)[this._stateByte]);
    } catch (_) {
      throw new Error('Can not get a relay state');
    }
  }

  set state(_) {
    throw new Error('Set method not supported');
  }
}

module.exports = Relay;
