const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique : true,
      },
    name: {
        type: String,
        required: true,
      },
    password: {
        type: String,
        required: true,
      },  
    institution: {
        type: String,
        required: true,
      },
    language: {
        type: String,
        required: true,
      }
  });
  
  const User = mongoose.model("users", UserSchema);
  
  module.exports = User;