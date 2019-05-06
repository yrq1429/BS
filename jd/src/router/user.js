var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var User = require('../model/user.js')
var bodyParser = require('body-parser')
var Userscore = require('../model/userscore.js');
// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1/school')

mongoose.connection.on('connected', () => {
  console.log('连接成功la');
})

mongoose.connection.on('error', () => {
  console.log('连接失败')
})

mongoose.connection.on('disconnected', () => {
  console.log('断开连接')
})

// 查询商品列表数据


module.exports = router;