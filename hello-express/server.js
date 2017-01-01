var express = require('express');
var middleware = require('./middleware.js');
var app = express();
var birds = require('./birds');

var PORT = process.env.PORT || 5001;
console.log(PORT);
app.use(middleware.logger);

// app.use(middleware.requireAuthentication);
app.use('/birds', birds);
// we can add route level middleware
app.get("/about", middleware.requireAuthentication,function(req, res){
    res.send('<h1>About us</h1>')
})

app.use(express.static(__dirname+"/public"));
console.log(__dirname+"/public")

app.listen(PORT, function() {
    console.log('Express Server is started on port ' + PORT)
})
