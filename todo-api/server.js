var express = require('express');

var app = express();

var PORT = process.env.PORT || 5001;

app.get('/', function(req, res) {
   res.send('Todo API root');
});

app.listen(PORT, function() {
   console.log('express server is listening on PORT: ' + PORT);
})
