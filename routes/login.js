const path = require('path');
const confile = path.join(__dirname,'../config.env');
const env2 = require('env2')(confile)
const querystring = require('querystring');

const handler = (request, reply) => {

  const urlGithub = 'https://github.com/login/oauth/authorize?';
  const redirectUri = 'https://localhost:8000/welcome';
  const clientId = process.env.CLIENT_ID;

  const parameters = querystring.stringify({
    client_id: clientId,
    redirect_uri: redirectUri
  })
  const url = urlGithub+parameters;

  reply.redirect(url);
}

module.exports = {
  method: 'GET',
  path: '/login',
  handler: handler
}
