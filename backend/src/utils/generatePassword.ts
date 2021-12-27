import ICharSets from '../types/ICharSets';
import IOptions from '../types/IOptions';

import generateRandomCharFromCharset from './generateRandomCharFromCharset';

export default function generatePassword(options: IOptions): string {
  const { bannedChars, length } = options;

  let password = '';

  for (let i = 0; i < length; i++) {
    const selectedOptions = Object.entries(options).filter(
      // Object.entries() returns a key pair value with [key, value]
      // If the value is true, then the key is selected
      key => key[1] === true
    );

    const randomIndex = Math.floor(Math.random() * selectedOptions.length);
    const randomKey = selectedOptions[randomIndex][0] as keyof ICharSets;

    const char = generateRandomCharFromCharset[randomKey]();

    if (bannedChars.includes(char)) {
      i--;
    } else {
      password += char;
    }
  }

  return password;
}
