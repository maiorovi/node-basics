var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 5001;
var todoNextId = 1;
var _ = require('underscore');



var todos = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next)  => {
   res.header("Content-Type", "application/json");
   next();
});

app.get('/', (req, res) => {
   res.send('Todo API root');
});

app.get('/todos', (req, res) => {
   res.send(JSON.stringify(todos));
});

app.get('/todos/:id', (req, res) => {
    var lookUpId = parseInt(req.params.id);

    var todoItem = _.findWhere(todos, {id:lookUpId});

    if (todoItem) {
        res.status(200).send(JSON.stringify(todoItem));
    } else {
       res.status(404).send("item with id not fount: " + lookUpId);
    }
});

app.post('/todos', (req, res) => {
   var body = _.pick(req.body, 'description', 'completed');
   console.log(req.body.completed);

   if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
      return res.status(400).send();
   }


   body.description = body.description.trim();

   var itemToPush = body;
   itemToPush.id = todoNextId++;
   todos.push(body);
   res.status(200).send(JSON.stringify(body));
});

app.delete('/todos/:id', (req, res) => {
    var lookUpId = parseInt(req.params.id);
    var todoToRemove = _.findWhere(todos, {id : lookUpId});

    if (!todoToRemove) {
        res.status(404).json({"error":"no todo found with that id"});
    } else {
        todos = _.without(todos, todoToRemove);
        res.status(200).json({"status" : "completed"});
    }

});


// app.put('/todos/:id'), (req, res) => {
//     var lookUpId = parseInt(req.params.id, 10);
//     var body = _.pick(req.body, 'description', 'completed');
//     var validAttributes = {};
//
//     if (body.has)
//
//     var todoToUpdate = _.findWhere(todos, {id:lookUpId});
//
//
//     if (!todoToUpdate) {
//         res.status(404).json({"status":"no todo found with that id"})
//     } else {
//         todos = _.without(todos, todoToUpdate);
//         todos.push()
//     }
//
// }

app.listen(PORT, () => {
   console.log('express server is listening on PORT: ' + PORT);
})
