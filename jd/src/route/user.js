// user.js
var express = require('express');
var app = express();
var router = express.Router();
router.get('/', function (req, res) {
    res.send('user');
});
module.exports = router; 
// 不要使用module.exports.router = router 