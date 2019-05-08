const CryptoJS = require('crypto-js');
import config from '../config';

export function encrypt(msg) {
  return CryptoJS.AES.encrypt(msg, config.PASSWORD_KEY).toString();
}

export function decrypt(msg) {
  const bytes = CryptoJS.AES.decrypt(msg, config.PASSWORD_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
