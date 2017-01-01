var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 5001;
var todoNextId = 1;
var _ = require('underscore');



var todos = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
   res.header("Content-Type", "application/json");
   next();
});

app.get('/', function(req, res) {
   res.send('Todo API root');
});

app.get('/todos', function(req, res) {
   res.send(JSON.stringify(todos));
});

app.get('/todos/:id', function(req, res) {
    var lookUpId = req.params.id;
    var todoItem = _.findWhere(todos, {id : lookUpId});
    if (todoItem) {
        res.status(200).send(JSON.stringify(todoItem));
    } else {
       res.status(404).send("item with id not fount: " + lookUpId);
    }
});

app.post('/todos', function(req, res) {
   var body = req.body;
   console.log(req.body.completed);

   if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
      return res.status(400).send();
   }

   var itemToPush = body;
   itemToPush.id = todoNextId++;
   todos.push(body);
   res.status(200).send(JSON.stringify(body));
});

app.listen(PORT, function() {
   console.log('express server is listening on PORT: ' + PORT);
})
