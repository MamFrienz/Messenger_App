var mongoose = require("mongoose"); 

var Schema = mongoose.Schema;

var userSchema = new Schema({
  displayName:{
      type: String,
      required: "Last Display Name Required"
  }
});

var User = mongoose.model('User', userSchema)
module.exports = User;