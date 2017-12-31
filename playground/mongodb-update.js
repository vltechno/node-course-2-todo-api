// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb');
  //findOneAndUpdate
  db.collection('Users').findOneAndUpdate({
    mwifename: 'Nguyen thi ngoc anh'
  },
  {$set:
    {
      // mwifename: 'Nguyen Thi Ngoc Anh'
      mwifename: 'HELLO WORLD'
    }
  }
  , {
    returnNewDocument: true
  }
  ).then((rsl) => {
    console.log(rsl);
  });

  db.collection('Users').updateMany({
    mwifename: 'Nguyen thi ngoc anh'
  },
  {$set:
    {
      // mwifename: 'Nguyen Thi Ngoc Anh'
      mwifename: 'Nguyen Thi Ngoc Anh'
    }
  }
  , {
    returnNewDocument: true
  }
  ).then((rsl) => {
    console.log(rsl);
  });
  // returnOriginal: false means returns the updated rather than the original
  // db.close();

});
