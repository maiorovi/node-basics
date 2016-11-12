 var express = require('express')
 var app  = express();
 var PORT = process.env.PORT || 3000

 app.get('/', function(req,res){
   res.send('TODO Root Api')
 })

 app.listen(PORT, function() {
   console.log('app is started on port ' + PORT)
 })
