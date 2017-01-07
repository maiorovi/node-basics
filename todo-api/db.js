var Sequilize = require('sequelize');
var sequilize = new Sequilize(undefined, undefined, undefined, {
    dialect : 'sqlite',
    storage : __dirname + '/data/dev-todo-api.db'
})

var db =  {
    todo : sequilize.import(__dirname + '/models/todo.js'),
    sequilize : sequilize,
    Sequilize : Sequilize
};

module.exports = db;



