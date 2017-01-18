var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 5001;
var todoNextId = 1;
var _ = require('underscore');
var db = require('./db')
var todos = [];
var usersApi = require('./user-api.js')
var middleware = require('./middleware')(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header("Content-Type", "application/json");
    next();
});

app.get('/', (req, res) => {
    res.send('Todo API root');
});

app.get('/todos', middleware.requireAuthentication, (req, res) => {
    var query = req.query;
    var where = {};

    if (query.hasOwnProperty('completed')) {
        where.completed = (query.completed === 'true')
    }

    if (query.hasOwnProperty('description') && query.description.length > 0) {
        where.description = {$like: '%' + query.description + '%'}
    }

    db.todo.findAll({
        where: where
    }).then((todos) => {
        res.json(todos)
    }, (e) => {
        res.status(500).json(e);
    });
});

app.get('/todos/:id',middleware.requireAuthentication, (req, res) => {
    var lookUpId = parseInt(req.params.id);

    db.todo.findById(lookUpId).then((todo) => {
        if (!!todo) {
            res.json(todo.toJSON());
        } else {
            res.status(404).json({description: "object with id " + lookUpId + " not found"});
        }
    }, (e) => {
        res.status(500).json(e)
    });
});

app.post('/todos', middleware.requireAuthentication, (req, res) => {
    console.log(req.body);
    var body = _.pick(req.body, 'description', 'completed');
    db.todo.create(body).then((todo) => {
        res.json(todo.toJSON);
    }).catch((e) => {
        res.status(400).json(e);
    });
});

app.delete('/todos/:id', middleware.requireAuthentication, (req, res) => {
    var lookUpId = parseInt(req.params.id);
    var todoToRemove = _.findWhere(todos, {id: lookUpId});

    db.todo.findById(lookUpId).then((todo) => {
        if (todo) {
            db.todo.destroy({where: {id: req.params.id}});
            res.json({"status": "completed"});
        } else {
            res.status(404).json({"error": "no todo found with that id"});
        }
    })
});

app.put('/todos/:id', middleware.requireAuthentication, (req, res) => {
    var lookUpId = parseInt(req.params.id);
    var body =req.body;
    var attributes = {};

    if (body.hasOwnProperty('completed')) {
        db.todo.attributes.completed = body.completed;
    }

    if (body.hasOwnProperty('description')) {
        attributes.description = body.description;
    }

    db.todo.update(attributes, {
        where: {
            id : lookUpId
        }
    }).then((todo) => {
        console.log(todo);
        if (todo[0] != 0) {
            res.status(200).json({status: "completed"})
        } else {
            res.status(404).json({status: "not found"})
        }
    }, (e) => {
        res.status(500).json(e);
    });
});

app.use('/users', usersApi);

db.sequilize.sync({force:true}).then(() => {
    app.listen(PORT, () => {
        console.log('express server is listening on PORT: ' + PORT);
    });
})


