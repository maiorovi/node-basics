// var url = 'http://api.openweathermap.org/data/2.5/weather?appid=PASTE_API_KEY_HERE&q=' + encodedLocation + '&units=imperial';
// appid=f738464ba8ca5bbf0c3c78df3766706e
// http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=f738464ba8ca5bbf0c3c78df3766706e

var request = require('request')
var url = 'http://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=f738464ba8ca5bbf0c3c78df3766706e'

request({json:true, url:url}, function(error, response, body) {
  if (error) {
    console.log(error)
    return;
  }

  if (response.statusCode == 200) {
    // console.log(JSON.stringify(JSON.parse(body), null, 4)
    console.log("City:" + body.name)
    console.log("Temperature:"+ body.main.temp)
  }
})

console.log("After Request!")
