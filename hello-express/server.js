var express = require('express')
var app = express()


app.get("/", function(req,res) {
  res.send('Hello Express')
})

app.get("/about", function(req, res){
  res.send('<h1>About us</h1>')
})

app.listen(3000)
