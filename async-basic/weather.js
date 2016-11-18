var request = require('request')

module.exports = function(location, callback) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q='+ location + '&appid=f738464ba8ca5bbf0c3c78df3766706e'

  request({json:true, url:url}, function(error, response, body) {
    if (error) {
      callback(error)
      return;
    }

    if (response.statusCode == 200) {
      // console.log(JSON.stringify(JSON.parse(body), null, 4)
      callback("City:" + body.name)
      callback("Temperature:"+ body.main.temp)
    }
  })
}
