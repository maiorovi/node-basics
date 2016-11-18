// var url = 'http://api.openweathermap.org/data/2.5/weather?appid=PASTE_API_KEY_HERE&q=' + encodedLocation + '&units=imperial';
// appid=f738464ba8ca5bbf0c3c78df3766706e
// http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=f738464ba8ca5bbf0c3c78df3766706e

var args = require('yargs').argv
var weather = require('./weather.js')
var location = require('./location.js')
console.log(args.l)
if (args.l) {
weather(args.l, function(msg) {
  console.log(msg)
})
} else {
  location(function(location){
    if (!location) {
      console.log('Location doesnt exist')
      return
    }
    console.log('City:' + location.city)
    console.log('log/lat:' + location.loc )

    weather(location, function(msg) {
      console.log(msg)
    })
  })

  console.log("After Request!")

}
