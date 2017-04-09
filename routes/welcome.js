const path = require('path');


const handler = (request, reply) => {
  console.log(request.query.code);
}


module.exports = {
  method: 'GET',
  path: '/welcome',
  handler: handler
}
