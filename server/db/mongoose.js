const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var myURI = process.env.MONGODB_URI;
const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
mongoose.connect(myURI, options);

// module.exports = {
//   mongoose : mongoose
// }
module.exports = {mongoose} // ES6
