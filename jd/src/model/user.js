var mongoose = require('mongoose');
var userSchma = require('./../schema/user.js');
const userModel = mongoose.model('Department',userSchma);
module.exports = userModel;