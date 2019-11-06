import _ from 'underscore';

class Utils {
  /**
   * Converts an array of bytes to a 1g string.
   * @param {Uint8Array} buffer array of bytes
   * @returns {string} converted string
   */
  convert1GBufferToString(buffer) {
    let retour = '';

    for (const num of buffer) {
      if (num === 0x50) {
        break;
      }

      retour += this.get1GChar(num);
    }

    return retour;
  }

  /**
   * Converts a string to an array of bytes.
   * @param {string} string the string to convert
   * @return {Uint8Array} The array of bytes to be written.
   */
  convertStringTo1GBuffer(string) {
    const buffer = [];
    for (const char of string) {
      const ccode = this.get1GCharCode(char);
      if (ccode < 0) {
        continue;
      }
      buffer.push(ccode);
    }
    buffer.push(0x50);

    return buffer;
  }

  /**
   * Convert identifier to character in 1g games.
   * @param {int} identifier Character identifier.
   * @param {boolean} [strictSpaces=false] if the spaces are strictly the 0x7F character.
   * @returns {string} Character
   */
  get1GChar(identifier, strictSpaces = false) {
    if (identifier < 0x50) {
      return strictSpaces ? '' : ' '; // Special character
    } else if (identifier === 0x50) {
      return '\0'; // Terminator
    } else if (identifier < 0x7F) {
      return strictSpaces ? '' : ' '; // Special character
    } else if (identifier === 0x7F) {
      return ' ';
    } else if (identifier <= 0x99) {
      return this._intToAscii(identifier, 0x80, 0x41); // Uppercase letter
    } else if (identifier <= 0x9B) {
      return this._intToAscii(identifier, 0x9A, 0x28); // Parenthesis
    } else if (identifier <= 0x9D) {
      return this._intToAscii(identifier, 0x9C, 0x3A); // Semicolon and colon.
    } else if (identifier === 0x9E) {
      return '['; // These character don't follow in ASCII table.
    } else if (identifier === 0x9F) {
      return ']';
    } else if (identifier <= 0xB9) {
      return this._intToAscii(identifier, 0xA0, 0x61); // Lowercase letter.
    } else if (identifier <= 0xCC) {
      switch (identifier) {
        case 0xBA:
          return 'à';
        case 0xBB:
          return 'è';
        case 0xBC:
          return 'é';
        case 0xBD:
          return 'ù';
        case 0xBE:
          return 'ß';
        case 0xBF:
          return 'ç';
        case 0xC0:
          return 'Ă';
        case 0xC1:
          return 'Ö';
        case 0xC2:
          return 'Ü';
        case 0xC3:
          return 'ä';
        case 0xC4:
          return 'ö';
        case 0xC5:
          return 'ü';
        case 0xC6:
          return 'ë';
        case 0xC7:
          return 'ï';
        case 0xC8:
          return 'â';
        case 0xC9:
          return 'ô';
        case 0xCA:
          return 'û';
        case 0xCB:
          return 'ê';
        case 0xCC:
          return 'î';
        default:
          return strictSpaces ? '' : ' ';
      }
    } else if (identifier < 0xE0) {
      return strictSpaces ? '' : ' '; // Special characters
    } else if (identifier < 0xF6) {
      switch (identifier) {
        case 0xE0:
          return '\'';
        case 0xE1:
          return '₭';
        case 0xE2:
          return '₦';
        case 0xE3:
          return '-';
        case 0xE4:
          return '+';
        case 0xE5:
          return strictSpaces ? '' : ' ';
        case 0xE6:
          return '?';
        case 0xE7:
          return '!';
        case 0xE8:
          return '.';
        case 0xE9:
          return 'ア';
        case 0xEA:
          return 'ウ';
        case 0xEB:
          return 'エ';
        case 0xEC:
          return '⇨';
        case 0xED:
          return '→';
        case 0xEE:
          return '↓';
        case 0xEF:
          return '♂';
        case 0xF0:
          return '$';
        case 0xF1:
          return '×';
        case 0xF2:
          return '.';
        case 0xF3:
          return '/';
        case 0xF4:
          return ',';
        case 0xF5:
          return '♀';
        default:
          return strictSpaces ? '' : ' ';
      }
    } else {
      return this._intToAscii(identifier, 0xF6, 0x48);
    }
  }

  get1GCharCode(char) {
    return this.firstGenChars.indexOf(char);
  }

  is1GPlayerNameValid(name) {
    if (name.length === 0) {
      return [false, "The name cannot be empty."];
    } else if (name.length > 10) {
      return [false, "The name cannot be longer than 10 characters."];
    } else {
      for (const char of name) {
        const ccode = this.get1GCharCode(char);
        if (ccode < 0) {
          return [false, `The character "${char}" is unknown in the game.`];
        }
      }
    }

    return [true, "The name is valid."];
  }

  get firstGenChars() {
    const result = [];
    for (let i = 0; i < 0xFF; ++i) {
      result.push(this.get1GChar(i, true));
    }

    return result;
  }

  /**
   * Converts an int to ascii with different deltas
   * @param {int} identifier Identifier of the original character
   * @param {int} start The offset from the beginning of this character.
   * @param {int} asciiStart The position in the ASCII table where we should inject it.
   * @returns {string} The character
   * @private
   */
  _intToAscii(identifier, start = 0, asciiStart = 0) {
    const delta = identifier - start;
    const newValue = delta + asciiStart;
    return String.fromCharCode(newValue);
  }
}

export default new Utils();
