// var url = 'http://api.openweathermap.org/data/2.5/weather?appid=PASTE_API_KEY_HERE&q=' + encodedLocation + '&units=imperial';
// appid=f738464ba8ca5bbf0c3c78df3766706e
// http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=f738464ba8ca5bbf0c3c78df3766706e

var request = require('request')
var weather = require('./weather.js')
var location = require('./location.js')

weather(function(msg) {
  console.log(msg)
})

locaiton(function(location){
  console.log('City:' + location.city)
  console.log('log/lat:' locaiton.loc )
})

console.log("After Request!")
