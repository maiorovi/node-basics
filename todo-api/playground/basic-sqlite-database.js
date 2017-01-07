var Sequilize = require('sequelize');
var sequelize = new Sequilize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': 'basic-sqlite-database.sqlite'
});


var Todo = sequelize.define('todo', {
    description: {
        type: Sequilize.STRING,
        allowNull: false,
        validate: {
            len: [1, 250]
        }
    },
    completed: {
        type: Sequilize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});


sequelize.sync().then(() => {
    console.log('Everything is synced');
    Todo.findById(2).then((todo) => {
        if (todo) {
            console.log(todo.toJSON());
        } else {
            console.log('not found');
        }
    });

    Todo.create({
        description: 'Walking my dog',
        completed: false
    }).then((todo) => {
        console.log(">>> " + JSON.stringify(todo));
        return  Todo.create({
            description: 'Clean office'
        });

    }).then((todo) => {
        console.log(">>> " + JSON.stringify(todo));
        return Todo.findAll({
            where : {completed : false}
        });
    }).then((todos) => {
      if (todos) {
          todos
          todos.forEach((todo) => {console.log(todo.toJSON())});
      } else {
          console.log('no todo found!');
      }
    }).catch(function (e) {
        console.log(e);
    })


});
