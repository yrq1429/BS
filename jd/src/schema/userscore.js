var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 公司职员Schema
const userScore = new Schema({
  account: String,
  username: String,
  college: String,
  proscore: Number,
  awdscore: Number,
});
module.exports =  userScore;