const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const userSchema = new mongoose.Schema({
  
  name:  String,
  email: {
    type:String,
    require: true, unique: true 
  },
  password:   String

});
const User = mongoose.model('User', userSchema);
module.exports=User;
