class Relay {
  constructor(device, id) {
    this._device = device;
    this._id = id;
  }

  switch(state) {
    try {
      this._device.write([0x00, state ? 0xff : 0xfd, this._id, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
    } catch (e) {
      throw new Error('Can not switch a relay to another state');
    }
  }

  get state() {
    try {
      return Boolean(this._device.getFeatureReport(0x00, 9)[7]);
    } catch (e) {
      throw new Error('Can not get a relay state');
    }
  }
}

module.exports = Relay;
