const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} =  require('./models/todo');
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
    } else {
      console.log('Send back error to client');
      res.status(200).send(err);
    }
  });
});

// app.post('/users',
//   (req, res) => {
//     var usr = new User({
//       email: req.body.email // get content from client
//       ,password: req.body.password // get content from client
//     });
//
//     usr.save()
//     .then((docs) => {
//       console.log('Saved sucessfully with the following info');
//       console.log(JSON.stringify(docs, undefined, 2));
//       console.log('Send back to client');
//       res.status(400).send(docs);
//     },
//     (err) => {
//       // if error happened
//       if(err) {
//         console.log('Send back error to client');
//         res.status(200).send(err.errors.password.message);
//         return
//           console.log('Unable to save with error: ', err);
//       } else {
//         console.log('Send back error to client');
//         res.status(400).send(err);
//       }
//     });
// });

app.listen(3000, (err) => {
  if (err) { return console.log('Unable to connect to client wiht this notification ', err);}
  console.log('started on port 3000');
});

module.exports = {
  app : app,
}
