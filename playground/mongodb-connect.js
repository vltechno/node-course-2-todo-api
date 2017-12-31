const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb');
  db.collection('Todos').insertOne({
    text: 'Cai Long'
    ,completed: false
  }, (err, result) => {
    if (err) {return console.log('Unable to insert Todos', err);}
    console.log(JSON.stringify(result.ops, undefined, 2)); // pretty
  });

  db.collection('Users').insertOne({
    mwifename: 'Nguyen thi ngoc anh'
    ,age: 28
    ,maritial_status: 'Married'
  },(err, rsl) => {
    if(err) {
      return console.log('Unable to created ' + rsl.mwifename);
    }
    console.log(JSON.stringify(rsl.ops, undefined, 2)); // pretty
    console.log(JSON.stringify(rsl.ops[0]._id.getTimestamp(), undefined, 2)); // pretty
  });
  db.close();
});
