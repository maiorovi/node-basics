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
    console.log(body);
    if (!_.isString(body.email) || !_.isString(body.password)) {
        res.status(400).json({status : "failed", description: "email or password is not string"})
    }

    db.user.findOne({
        where: {
            email: body.email
        }
    }).then((user) => {

        if (!user) {
            res.status(404).json({status: "failed", descrioption:"user does not exists"})
        } else if (bcrypt.hashSync(body.password, user.salt) === user.password_hash) {
            res.status(200).json({status:"successful", description:"authenticated"})
        } else {
            res.status(401).json({status:"failed", description: "authentication failed"})
        }
    }, (e) => {
        res.status(500).json(e)
    });
});


module.exports = router;