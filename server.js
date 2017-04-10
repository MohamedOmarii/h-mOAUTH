const hapi = require('hapi');
const inert = require('inert');
const routes = require('./routes/index.js');
const fs = require('fs');
const hapiAuth = require('hapi-auth-jwt2');


const server = new hapi.Server();

const options = {
  key: fs.readFileSync('./keys/key.pem'),
  cert: fs.readFileSync('./keys/cert.pem')
}

server.connection({
  port: process.env.PORT || 8000,
  host: 'localhost',
  tls: options
});

server.register([inert, hapiAuth], (err) => {
  if (err) throw err;

  server.route(routes);
})

module.exports = server
