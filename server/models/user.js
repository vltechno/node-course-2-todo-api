const mongoose = require('mongoose');

// model
var User = mongoose.model('User', {
  email: {
    type: String
    ,required: true
    ,minlength: 1
    ,trim: true
    ,match: /\@.*\.com/
  },
  password: {
    type: String
    ,required: true
    ,minlength: 8
    ,trim: false
    ,match: /\!{1}|\@{1}|\#{1}|\${1}|\%{1}|\^{1}|\&{1}|\*{1}|\({1}|\){1}|\_{1}|/ && /^[A-Z]{3}/
  }
});

module.exports = {
  User
};
