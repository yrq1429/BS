var mongoose = require('mongoose');
var userscoreSchma = require('./../schema/user.js');
const userscoreModel = mongoose.model('Department',userscoreSchma);
module.exports = userscoreModel;