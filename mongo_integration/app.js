var MongoClinet = require('mongodb').MongoClient,
    assert = require('assert'),
    express = require('express'),
    app = express(),
    engines = require('consolidate');

MongoClinet.connect('mongodb://localhost:27017/video', (err, db) => {

    app.engine('html', engines.nunjucks);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    app.get('/', (req, res) => {
        db.collection('movies').find({}).toArray((err, docs) => {
            res.render('movies', {'movies': docs});
        });
    });


    app.use((req, res) => {
        res.sendStatus(404);
    });


    assert.equal(null, err);
    console.log("Successfully connected to server!");



    console.log("Called find()");


    var server = app.listen(3000, () => {
        var port = server.address().port;
        console.log('Server is started on port %s', port);
    });

});