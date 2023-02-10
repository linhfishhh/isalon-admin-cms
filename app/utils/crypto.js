import CryptoJS from 'crypto-js';

const { CRYPTO_AES_KEY } = process.env;
const encryptData = str => CryptoJS.AES.encrypt(str, CRYPTO_AES_KEY).toString();
const decryptData = str =>
  CryptoJS.AES.decrypt(str, CRYPTO_AES_KEY).toString(CryptoJS.enc.Utf8);

export { encryptData, decryptData };
