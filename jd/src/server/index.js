var express = require('express')
const cors = require('cors')
var router = express.Router()
var mongoose = require('mongoose')
var User = require('../router/user.js')
var bodyParser = require('body-parser')
var Userscore = require('../model/userscore.js');

// response.setHeader("Access-Control-Allow-Origin","*");    // 允许跨域

var app = express();
app.listen(3001)
app.get('/api/login', (req, res) => {
  res.json("求你了")
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.all('*', function(req, res, next) {
      // TODO 支持跨域访问
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token");
      res.setHeader("Access-Control-Expose-Headers", "*");
      next();
});

app.post('/api/login', (req, res) => {
  console.log("/api/login")
})




