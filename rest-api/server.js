 var express = require('express')
 var app  = express();
 var PORT = process.env.PORT || 3000
 var todos = [
   {id:1, description: 'Meet mom for lunch', completed: false},
   {id:2, description: 'Go to market', completed: false},
   {id:3, description: 'Feed the cat', completed: true}
 ]

 app.get('/', function(req,res){
   res.send('TODO Root Api')
 })

 // GET /todos
 app.get('/todos', function(req, res) {
   res.json(todos)
 })

 // GET /todos/id
 app.get('/todos/:id', function(req, res) {
   var matchedTodo;

   todos.forEach(function(todo) {
     if (todo.id == req.params.id) {
       matchedTodo = todo
     }
   })

   if(matchedTodo) {
     res.json(matchedTodo)
   } else {
     res.status(404).send('Not found')
   }

 })

 app.listen(PORT, function() {
   console.log('app is started on port ' + PORT)
 })
