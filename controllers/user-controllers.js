var User = require('./../models/User.js');
var Chatroom = require('./../models/Chatroom.js');

module.exports.login = function(request, response) {
   if(request.body.userID ===""){
      var new_user = new User({
         displayName: request.body.displayName
      });
      
      new_user.save(function(err, data) {
         if (err)
            return response.status(400).json({error: err});
         
         response.status(200).json({
            displayName: request.body.displayName,
            userID: data._id
         });
      })
   } else {
      User.findOne({_id:request.body.userID},function(err, data){
         if(err)
            return response.status(400).json({error: err});
         data.displayName = request.body.displayName;
         data.save(function(err, data){
            if (err)
               return response.status(400).json({error: err});
            
            response.status(200).json({
               displayName: data.displayName,
               userID: data._id
            });
         });
      });
   }
}


module.exports.dashboard = function(request, response) {
   var chat_history=[];
   Chatroom.find(function(err, data){
      if(err)
         return response.status(400).json({error: err});
      for(var i =0; i<data.length; i++){
         var temp = {chatroomName:"", chatroomID:""};
         for(var j =0; j<data[i].members.length; j++){
            if(data[i].members[j].id == request.params.userID){
               temp.chatroomName = data[i].chatroomName;
               temp.chatroomID = data[i]._id;
               chat_history.push(temp);
            }
         }
      }
      User.findOne({_id:request.params.userID},function(err, data){
         if(err)
            return response.status(400).json({error: err});
         
         response.render('dashboard.ejs', {
            title: data.displayName,
            user_id: data._id,
            chat_history: chat_history
         });
      });
   });
}