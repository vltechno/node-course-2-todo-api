const mongoose = require('mongoose');

// model
var User = mongoose.model('User', {
  email: {
    type: String
    ,required: true
    ,minlength: 10
    ,trim: true
    ,match: /\@.*\.com/
  },
  password: {
    type: String
    ,required: true
    ,minlength: 8
    ,trim: false
    ,match: /^[A-Z]{3}.*\@|\!|\#|\$|\%|\^|\&|\*/
  }
});

module.exports = {
  User
};
