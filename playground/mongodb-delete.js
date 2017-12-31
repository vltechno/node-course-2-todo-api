// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb');
  // deleteMany
    // db.collection('Todos').deleteMany({
    //   text: 'Cai Long'
    // }).then((rsl) => {
    //   console.log(rsl);
    // });
  // deleteOne
    // db.collection('Todos').deleteOne({
    //   text: 'eat lunch'
    // }).then((rsl) => {
    //   console.log(rsl);
    // });
  // findOneAndDelete
    // db.collection('Users').findOneAndDelete({
    //   text: 'shit'
    // }).then((rsl) => {
    //   console.log(rsl);
    // });

    // remove duplicated Users
    db.collection('Users').deleteMany({
      mwifename : 'Nguyen thi ngoc anh'
    });
  // db.close();

});
