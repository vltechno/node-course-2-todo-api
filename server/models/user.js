const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _=require('lodash');
// model
var UserSchema = new mongoose.Schema({
  email: {
    type: String
    ,required: [true, 'Email is required']
    ,minlength: 10
    ,trim: true

    ,match: /\@.*\.com/
    ,unique: true
    ,validate :{
      validator: (mail) => {
        return validator.isEmail(mail);
      }
      ,message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String
    ,required: true
    ,minlength: 8
    ,trim: false
    ,match: /^[A-Z]{3}.*\@|\!|\#|\$|\%|\^|\&|\*/
  }
  ,tokens: [{
    access: {
      type : String
      ,required: true
    },
    token: {
      type : String
      ,required: true
    }
  }]
},
// options
{
        usePushEach: true
        ,isAsync: true
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObj = user.toObject();
  return _.pick(userObj, ['_id', 'email'])
};

UserSchema.methods.generateAuthToken = function () {
  var user = this; // UserSchema object
  var access = 'auth';
  var data = {
    _id     : user._id.toHexString()
    ,access
  };
  var token = jwt.sign(data,'HIT20&SHIT').toString();
  user.tokens.push({access, token});
  user.save();
  return token;
};

var User = mongoose.model('User', UserSchema);
module.exports = {
  User
};
