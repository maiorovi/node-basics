 var express = require('express')
 var bodyParser = require('body-parser')
 var _ = require('underscore')
 var app  = express();
 var PORT = process.env.PORT || 3000
 var todos = []

 // {id:1, description: 'Meet mom for lunch', completed: false},
 // {id:2, description: 'Go to market', completed: false},
 // {id:3, description: 'Feed the cat', completed: true}

 var todosId = 1

 app.use(bodyParser.json()); // for parsing application/json
 app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

 app.get('/', function(req,res){
   res.send('TODO Root Api')
 })

 // GET /todos
 app.get('/todos', function(req, res) {
   res.json(todos)
 })

 // GET /todos/id
 app.get('/todos/:id', function(req, res) {

  // var matchedTodo = _.find(todos, function(todo) { return todo.id == req.params.id })
  var todoId = parseInt(req.params.id, 10)
   var matchedTodo = _.findWhere(todos, {id:todoId})

   if(matchedTodo) {
     res.json(matchedTodo)
   } else {
     res.status(404).send('Not found')
   }
 })

//POST todos
 app.post('/todos', function(req, res) {
    var body = req.body
    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0) {
        res.status(400).send()
    }

    todos.push({id: todosId, description: body.description,  completed: body.completed })
    todosId++;
    res.json(body)
 });

 app.listen(PORT, function() {
   console.log('app is started on port ' + PORT)
 })
