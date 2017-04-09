const staticHandler = require('./static.js');
const loginHandler = require('./login.js');
const welcomeHandler = require('./welcome.js');

module.exports = [
  staticHandler, loginHandler, welcomeHandler
]
