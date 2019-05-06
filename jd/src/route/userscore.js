// student.js
var express = require('express');
var app = express();
var router = express.Router();
router.get('/', function (req, res) {
    res.send('欢迎进入student主接口');
});
router.get('/read', function (req, res) {
    res.send('欢迎进入student接口下的read接口');
});
module.exports = router; 
// 不要使用module.exports.router = router 