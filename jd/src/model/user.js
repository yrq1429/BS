var mongoose = require('mongoose');
// var userSchma = require('./../schema/user.js');
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  account: String,
  password: String,
  type: String
});
module.exports = mongoose.model('user', userSchema);