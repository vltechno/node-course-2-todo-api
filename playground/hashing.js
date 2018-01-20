const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, 'vltech');
console.log(token);

var decoded = jwt.verify(token, 'vltech');
console.log('decoded', decoded);
