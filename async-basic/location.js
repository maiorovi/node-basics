var request = require('request')
var url = 'http://ipinfo.io/'

module.exports = function(location) {
      request({json:true, url:url}, function(error, response, body) {
        if (error) {
          location()
          return
        }

        location(body)

      })
}
