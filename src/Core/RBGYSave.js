import Save from './Save';
import Utils from './Utils';

export default class RGBYSave extends Save {
  get playerName() {
    return Utils.convert1GBufferToString(this.getData(0x2598, 0xB));
  }

  /**
   * Writes player name in the save in the browser memory.
   * @param {string} name the player name
   * @return {Array<boolean, string>} If the save worked and the message
   */
  writePlayerName(name) {
    const toReturn = Utils.is1GPlayerNameValid(name);
    if (toReturn[0]) {
      const data = Utils.convertStringTo1GBuffer(name);
      this.writeData(0x2598, data, 0xB);
    }

    return toReturn;
  }

  get savedChecksum() {
    const [checksum] = this.getData(0x3523);
    return checksum;
  }

  get computedChecksum() {
    let computed = 0;
    for (let i = 0x2598; i <= 0x3522; ++i) {
      computed += this.getByte(i);
      console.log(computed);
    }
    return (~computed) & 0xFF;
  }

  regenChecksum() {
    this.writeByte(0x3523, this.computedChecksum);
  }

  getBankData(bank, offset, length = 1) {
    return this.getData((bank * 0x2000) + offset, length);
  }
}
