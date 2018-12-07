var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var chatroomSchema = new Schema({
    creationTime:{
        type: Date,
        default: Date.now
    },
    creator:{
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    },
    state:{
      type: Number,
      required: "Chatroom Status required"
    },
    members: [{
        name:{
            type: String,
            required: "Member Name required"
        },
        id:{
            type: mongoose.Schema.ObjectId, 
            ref: 'User'
        }
    }],
    
    chatroomName:{
        type: String,
        required: "Session name required"
    },

    messages: [{
        sender: {
            type: mongoose.Schema.ObjectId, 
            ref: 'User'
        },
        
        text: {
            type: String,
            required: "Messege Text required"
        },
        time: {
            type: Date,
            default: Date.now,
            required: "Messege Time required"
        }
    }]
});

var Chatroom = mongoose.model('Chatroom', chatroomSchema)
module.exports = Chatroom;