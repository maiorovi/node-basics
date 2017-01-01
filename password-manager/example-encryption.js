var cryptoJs = require('crypto-js');

var secretMessage = 'I hid the chips under the couch';
var secretKey = '123abc';

var encryptedMessage = cryptoJs.AES.encrypt(secretMessage, secretKey);

console.log(encryptedMessage);
