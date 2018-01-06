const mongoose = require('mongoose');

// model
var Todo = mongoose.model('Todo', {
  text: {
    type: String
    ,required: true
    ,minlength: 3
    ,trim: true
  },
  completed: {
    type: Boolean
    ,default: false
  },
  completedAt: {
    type: Number
    ,default: null
  }
});

module.exports = {
  Todo: Todo
};
