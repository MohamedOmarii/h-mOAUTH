const path = require('path');

module.exports = {
  method: 'GET',
  path: '/login',
  handler: {
    directory: {
      path: path.join(__dirname,'..','public/')
    }
  }
}
