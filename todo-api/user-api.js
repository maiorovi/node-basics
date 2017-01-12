var express = require('express');
var router = express.Router();
var db = require('./db');
var _ = require('underscore');
var bcrypt = require("bcrypt-nodejs");

router.post('/', (req, res) => {
    var user = _.pick(req.body, 'password', 'email');

db.user.create(user).then((user) => {
    res.json(user.toPublicJSON());
}, (e) => {
    res.status(400).json(e)
});
});

router.post('/login', (req, res) => {
    var body = _.pick(req.body, 'email', 'password');

    db.user.authenticate(body).then((user) => {
        res.json(user);
    }, (e) => {
        res.status(401).send();
    });
});


module.exports = router;