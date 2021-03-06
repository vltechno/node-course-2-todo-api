const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _=require('lodash');
require('./config/config.js');

var {mongoose} = require('./db/mongoose');
var {Todo} =  require('./models/todo');
var {User} =  require('./models/todo');
// is same as
// model
// var Todo = mongoose.model('Todo', {
//   text: {
//     type: String
//     ,required: true
//     ,minlength: 1
//     ,trim: true
//   },
//   completed: {
//     type: Boolean
//     ,default: false
//   },
//   completedAt: {
//     type: Number
//     ,default: null
//   }
// });
// end model

// deploy heroku
const port = process.env.PORT || 3000;
//https://still-mountain-85936.herokuapp.com/todos
var {User} =  require('./models/user');

var app = express();

app.use(bodyParser.json());

// post(rout, (req, res), (err))
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text // get content from client
  });

  todo.save().then((docs) => {
    console.log('Saved sucessfully with the following info');
    console.log(JSON.stringify(docs, undefined, 2));
    console.log('Send back to client with status 400 and data as above');
    res.status(200).send(docs);
  },
  (err) => {
    // if error happened
    if(err) {
      console.log('Send back error to client');
      res.status(400).send(err);
      return
        console.log('Unable to save with error: ', err);
    }
  });
});


app.get('/todos',(req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  },(err) => {
    res.status(400).send(err);
  });
});



app.get('/todos/:id',(req, res) => {
  var id =  req.params.id;
  if(!ObjectID.isValid(id)) {
    res.status(404).send('The id is not valid');
    return console.log('Id is %s not valid', id);
  }
  Todo.findById(id).then((todo) => {
    if(todo === null) {
      return res.status(400).send('The ID is not found');
    }
      // console.log('here !!'+ todo);
      res.status(200).send(todo);
  },(err) => {
    // res.status(400).send('Something wrong with the ID');
    res.status(400).send('Something wrong with the ID');
  });
})

app.delete('/todos/:id',(req, res) => {
  // get id
  var id = req.params.id;
  // validate it , remove 404
  if(!ObjectID.isValid(id)) {
    return res.status(404).send({});
  }
    // remove by id
  Todo.findByIdAndRemove(id, (err, result) =>{
    if(err) {
      return res.status(400).send({text: 'error has occured'});
    }else {
      if(result) {
        res.status(200).send(result);
      }else {
        res.status(404).send({text: 'deleted'});
      }
    }
  }).catch((e) => {
    return res.status(400).send({text: 'error has occured'});
  });
    // sucessfully
      // if not found 404
      // eles send back doc with 200
    // errors
      // 400 with empty body
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  // var body = _.pick(req.body, ['completed']);
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed ) {
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }
  // Todo.findByIdAndUpdate(id,{$set: body},{new:true}).
  Todo.findByIdAndUpdate(id,{$set: body}).setOptions({new: true}). // return modified
  then((todo) => { // this i think callback
    if(!todo) {
      return res.status(404).send();
    } else {
      res.status(200).send(todo);
    }
  }).catch((e) => {
    res.status(400).send();
  });
});

app.get('/users',(req, res) => {
  User.find().then((users) => {
    res.send({users});
  },(err) => {
    res.status(400).send(err);
  });
});

app.post('/users',
  (req, res) => {
    var usr = new User({
      email: req.body.email // get content from client
      ,password: req.body.password // get content from client
    });
    usr.save().then((usr) => {
      return usr.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(usr);
    }).catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(port, (err) => {
  if (err) { return console.log('Unable to connect to client wiht this notification', err);}
  console.log('started on port %d', port);
});

module.exports = {app};
