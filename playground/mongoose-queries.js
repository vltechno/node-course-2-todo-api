const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5a4fb1e7aa0c6b543456c39zb';

const {ObjectID} = require('mongodb');
// var id  = new ObjectID;
if(!ObjectID.isValid(id)) {
  return console.log("ID %s is >> not << valid",id);
}else {
  console.log("ID %s is valid",id);
}
// Todo.find({
//   _id: id
// }).then((todos) => {
//   if(todos.length == 0) {
//     return console.log('ID not found');
//   }
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if(!todo) {
//     return console.log('ID not found');
//   }
//   console.log('Todo', todo);
// });

Todo.findById(id).then((todo) => {
  if(!todo) {
    return console.log('ID not found');
  }
  console.log('Todo by ID', todo);
})
// .catch((err) => {
//   console.log(err);
// });
.catch((err) => console.log(err) );
