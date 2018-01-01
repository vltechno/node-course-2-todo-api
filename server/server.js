const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} =  require('./models/todo');
var {User} =  require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((docs) => {
    console.log('Saved sucessfully with the following info');
    console.log(JSON.stringify(docs, undefined, 2));
    console.log('Send back to client');
    res.status(400).send(docs);
  }, (err) => {
    // if error happened
    if(err) {
      console.log('Send back error to client');
      res.status(200).send(err);
      return
        console.log('Unable to save with error: ', err);
    } else {
      console.log('Send back error to client');
      res.status(400).send(err);
    }
  });
});

app.listen(3000, (err) => {
  if (err) { return console.log('shit', err);}
  console.log('started on port 3000');
});
