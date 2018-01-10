const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5a54e0aefa748809ba08fe2f';

const {ObjectID} = require('mongodb');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAnd
            //Update
            //Remove
// Todo.findByIdAndRemove
Todo.findByIdAndRemove(id).then((todo) => {
  console.log(todo);
});
