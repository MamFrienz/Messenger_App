var Chatroom = require('./../models/Chatroom.js');

module.exports.create = function(request, response) {
   var new_chatroom = new Chatroom({
      creator: request.body.creator,
      state: 1,
      members: request.body.members,
      chatroomName: request.body.chatroomName
   });
   
   new_chatroom.save(function(err, data) {
      if (err)
         return response.status(400).json({error: err});
      
      response.status(200).json({
         chatroomID: data._id
      });
   })
}

module.exports.search = function(request, response) {
   Chatroom.find({chatroomName: request.body.chatroomName}, function(err, data){
      if(err)
         return response.status(400).json({error: err});
      console.log(data)
      response.status(200).json({
         results: data
      });
   });
}

module.exports.res = function(request, response) {
   response.render('chatboxs.ejs', {
      title: "Results"
   });
}




module.exports.chat = function(request, response) {
   Chatroom.findOne({_id:request.params.chatID},function(err, data){
      if(err)
         return response.status(400).json({error: err});
         
      response.render('chatbox.ejs',{
         title: data.chatroomName,
         members: data.members,
         messages: data.messages,
         state: data.state
      })
})
  /*
      var new_chatroom = new Chatroom({
         
      });
      
      new_user.save(function(err, data) {
         if (err)
            return response.status(400).json({error: err});
         
         response.status(200).json({
            displayName: request.body.displayName,
            userID: data._id
         });
      })
  */  
}


module.exports.hist = function(request, response) {
   Chatroom.findOne({_id: request.params.chatID}, function(err, data){
      if(err)
         return response.status(400).json({error: err});
      
      response.render('history.ejs',{
         title: data.chatroomName,
         members: data.members,
         messages: data.messages,
         creationTime: data.creationTime
      })
   })
}