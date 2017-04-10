const staticHandler = require('./static.js');
const loginHandler = require('./login.js');
const welcomeHandler = require('./welcome.js');
const secureHandler = require('./secure.js');

module.exports = [
  staticHandler, loginHandler, welcomeHandler, secureHandler
]
