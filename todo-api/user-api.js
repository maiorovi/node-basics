var express = require('express');
var router = express.Router();
var db = require('./db')


router.post('/', (req, res) => {
    var user = _.pick(req.body, 'password', 'email');

db.user.create(user).then((user) => {
    res.json(user.toPublicJSON());
}, (e) => {
    res.status(400).json(e)
});
});

router.post('/login', (req, res) => {

});


module.exports = router;