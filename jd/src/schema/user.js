var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 公司职员Schema
const userSchema = new Schema({
  account: String,
  password: String,
  root: String
});
module.exports =  userSchema;