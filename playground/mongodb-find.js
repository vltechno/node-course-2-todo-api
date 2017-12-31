// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb');
  // db.collection('Users').find({completed: false}).toArray().then((docs) => {
  //   console.log('Users');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // },(err) => {
  //   console.log('Unable to fetch todos', err);
  // });
  db.collection('Users').find({
    age: 28
  }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  });
  // db.close();
});
