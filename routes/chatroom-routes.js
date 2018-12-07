module.exports = function(app) {
  var chatroom = require('./../controllers/chatroom-controllers.js');
  
  app.post('/chatroom/create', chatroom.create);
  app.post('/chatroom/search', chatroom.search);
  app.get('/chatroom/search/results', chatroom.res);
  app.get('/chatroom/:user_id/:chatID', chatroom.chat);
  app.get('/chatroom/:chatID', chatroom.hist);
  
}
