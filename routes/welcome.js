const request = require('request');
const env = require('env2')('./config.env');
const url = require('url');
const queryString = require('querystring');
const jwt = require('jsonwebtoken');

module.exports = {
  method: 'GET',
  path: '/welcome',
  handler: (req, rep) => {
    var sendAuth = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code
    }

    var options = {
      url: 'https://github.com/login/oauth/access_token',
      method: 'POST',
      body: sendAuth,
      json: true
    };

    request(options, function (error, response, body) {
      if (error) {
        console.log('Error:', error);
        return;
      }

      if (!body.access_token) {
        return rep('Somthing went wrong!!');
      } else {
        let url =  'https://api.github.com/users/mohamedomarii';
        let header = {
          'User-Agent': 'oauth_github_jwt',
          Authorization: `token ${body.access_token}`
        };
        request.get({url:url, headers:header}, (error, response, body) => {
          if (error) throw error;

          let payload = {
            'user': {
                'username': body.login,
                'img_url': body.avatar_url,
                'user_id': body.id
              },
            'accessToken': body.access_token
          }

          let options = {
            'expiresIn': Date.now() + 24 * 60 * 60 * 1000,
            'subject': 'github-data'
          }

          jwt.sign(payload,process.env.SECRET,options,(error, token) => {
            if (error) {
              return error;
            }
            rep.redirect('/secure').state('token', token, {
              path: '/',
              isHttpOnly: false,
              isSecure: process.env.NODE_ENV === 'PRODUCTION' 
            });
          });
        });
      }
    });
  }
}
