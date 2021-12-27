export default {
  lowerCase(): string {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  },

  upperCase(): string {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  },

  number(): string {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  },

  special(): string {
    return String.fromCharCode(Math.floor(Math.random() * 11) + 33);
  }
};
