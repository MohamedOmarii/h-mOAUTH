module.exports = {
  method: 'GET',
  path: '/secure',
  config: {auth: 'jwt'},
  handler: (request, reply) => {
    reply('you are successfully logged in');
  },
}
