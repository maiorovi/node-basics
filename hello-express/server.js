var express = require('express')
var app = express()
var PORT = 3000

app.get("/", function(req,res) {
  res.send('Hello Express')
})

app.get("/about", function(req, res){
  res.send('<h1>About us</h1>')
})

app.use(express.static(__dirname+"/public"));
console.log(__dirname+"/public")

app.listen(PORT, function() {
  console.log('Express Server is started on port ' + PORT)
})
