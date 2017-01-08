var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 5001;
var todoNextId = 1;
var _ = require('underscore');
var db = require('./db')
var todos = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header("Content-Type", "application/json");
    next();
});

app.get('/', (req, res) => {
    res.send('Todo API root');
});

app.get('/todos', (req, res) => {
    var query = req.query;
    var where = {};

    if (query.hasOwnProperty('completed')) {
        where.completed = (query.completed === 'true')
    }

    if (query.hasOwnProperty('description') && query.description.length > 0) {
        where.description = {$like : '%'+query.description+'%'}
    }

    db.todo.findAll({
        where : where
    }).then((todos) => {
        res.json(todos)
    }, (e) => {
        res.status(500).json(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var lookUpId = parseInt(req.params.id);

    db.todo.findById(lookUpId).then((todo) => {
        if (!!todo) {
            res.json(todo.toJSON());
        } else {
            res.status(404).json({description : "object with id " + lookUpId + " not found"});
        }
    }, (e) => {
        res.status(500).json(e)
    });
});

app.post('/todos', (req, res) => {
    console.log(req.body);
    var body = _.pick(req.body, 'description', 'completed');
    db.todo.create(body).then((todo) => {
        res.json(todo.toJSON);
    }).catch((e) => {
        res.status(400).json(e);
    });
});

app.delete('/todos/:id', (req, res) => {
    var lookUpId = parseInt(req.params.id);
    var todoToRemove = _.findWhere(todos, {id: lookUpId});

    if (!todoToRemove) {
        res.status(404).json({"error": "no todo found with that id"});
    } else {
        todos = _.without(todos, todoToRemove);
        res.status(200).json({"status": "completed"});
    }

});

app.put('/todos/:id', (req, res) => {
    console.log("Hello");
    console.log(req.params.id);
    var lookUpId = parseInt(req.params.id);
    var matchedTodoItem = _.findWhere(todos, {id: lookUpId});
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};

    if (!matchedTodoItem) {
        return res.status(404).send();
    }

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed') && !_.isBoolean(body.completed)) {
        return res.status(400).send();
    }

    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return res.status(400).send();
    }

    _.extend(matchedTodoItem, validAttributes);

    res.status(200).send();
});

db.sequilize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('express server is listening on PORT: ' + PORT);
    });
})


