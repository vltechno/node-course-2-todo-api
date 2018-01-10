const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');

const todos = [
  {
    _id : new ObjectID
    ,text : 'vinh'
    ,completed: true
    ,completedAt: 222
  }
  ,{
    _id: new ObjectID
    ,text : 'sinh'
  }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    // initialize some data into db
    return Todo.insertMany(todos);
  }).then(() => {
    done();
  });
});


describe('POST /todos', () => {
  it('Should create a new todo', (done) => {
    var text = 'Test todo text';
    request(app)
    .post('/todos')
    .send({
      text : text
    })
  //  .expect()
    .expect((res) => {
      expect(res.body.text).toBe(text);
      expect(res.status).toBe(200);
    }).end((err, res) => {
      if(err) {
        return done(err);
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((err) => done(err));
    });
  });
  it('should not create todo with invalid data', (done) => {
    var text = 'lt';
    request(app)
    .post('/todos')
    .send({text})
    .expect((res) => {
      expect(res.status).toBe(400);
    }).end((err, res) => {
      if(err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((err) => done(err));
    });
  });
}); // end describe

describe('GET todos/:id', () => {
  it('should send back todo obj', (done) => {
  //  var id = '5a5103ba86ffca9c3a6dfdb0';
    // console.log(todos[0]._id.toHexString());
    request(app)
    .get('/todos/'+ todos[0]._id.toHexString())
    .expect((res) => {
      expect(res.body.text).toBe(todos[0].text);
    })
    .end((err, res) => {
      if(err) {return done(err);}
      done();
    });
  });
});


describe('Delete todos/:id', () => {
  var id = todos[0]._id.toHexString()
  it('should removed a todo', (done) => {
    request(app)
    .delete('/todos/'+ id)
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(todos[0].text);
    }).end((err, res) => {
      if(err) {return done(err);}
      Todo.findById(id).then((todo) => {
        expect(todo).toBe(null);
      }).catch((e) => done(e));
      done();
    });
  });
});

describe('Patch todos/:id', () => {
  var id = todos[0]._id.toHexString()
  it('should update new a todo', (done) => {
    request(app)
    .patch('/todos/'+ id)
    .send({completed: false, text: "VLTECHNO"})
    .expect(200)
    .expect((res) => {
      expect(res.body.completed).toBe(false);
    }).end((err, res) => {
      if(err) {return done(err);}

      done();
    });
  });
});
