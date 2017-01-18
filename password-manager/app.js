console.log("app is started")

var storage = require('node-persist')

storage.initSync();

// storage.setItemSync('name', 'Andrew');
var name = storage.getItemSync('name')
console.log('Saved name is: ' + name)
