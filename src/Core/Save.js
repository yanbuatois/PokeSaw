import { saveAs } from 'file-saver';

export default class Save {
  constructor (file) {
    this._file = file;
  }

  async bufferingSave() {
    this._buffer = await new Response(this._file).arrayBuffer();
    this._8array = new Uint8Array(this._buffer);
  }

  getData(offset, length = 1) {
    return this._8array.slice(offset, offset + length);
  }

  getByte(offset) {
    const [byte] = this.getData(offset, 1);

    return byte;
  }

  writeData(offset, data, maxLength = -1) {
    let nb = 0;
    for (const val of data) {
      this._8array[offset + nb] = val;
      ++nb;
      if (maxLength >= 0 && nb >= maxLength) {
        break;
      }
    }
  }

  writeByte(offset, data) {
    this._8array[offset] = data;
  }

  saveAs() {
    saveAs(new Blob([this._8array], {
      type: 'application/octet-stream',
    }), this._file.name);
  }
}
