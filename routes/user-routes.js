module.exports = function(app) {
  var user = require('./../controllers/user-controllers.js');
  app.post('/user/login', user.login);
  app.get('/user/:userID', user.dashboard);
}
