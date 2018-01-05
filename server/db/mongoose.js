const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/taskList');

module.exports = {
  mongoose : mongoose
}
