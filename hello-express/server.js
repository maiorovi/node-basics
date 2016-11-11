var express = require('express')
var app = express()
var PORT = 3000

var middleware = {
    requireAuthentication : function(req, res, next) {
      console.log('private route hit!')
      next()
    },
    logger: function(req,res,next) {
      console.log('Request:' + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl)
      next()
    }
}

app.use(middleware.logger)

// app.use(middleware.requireAuthentication);

// we can add route level middleware
app.get("/about", middleware.requireAuthentication,function(req, res){
  res.send('<h1>About us</h1>')
})

app.use(express.static(__dirname+"/public"));
console.log(__dirname+"/public")

app.listen(PORT, function() {
  console.log('Express Server is started on port ' + PORT)
})
