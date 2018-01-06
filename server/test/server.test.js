const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todos = [
  {
    text : 'vinh'
  }
  ,{
    text : 'sinh'
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
