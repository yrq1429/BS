var User = require("../model/user.js")
var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost:27017/school';
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'school',
  multipleStatements: true
});
 
connection.connect();

// 登录功能
app.post('/login',function (req,res) {
  var  name=req.body.account;
  var  pwd=req.body.password;
  var selectSQL = "select * from user where username = '"+name+"' and password = '"+pwd+"'";
  connection.query(selectSQL,function (err,result) {
      if (err) throw  err;
      if(result==[])
        {
          res.json({
            code: '10004',
            msg: '用户名或密码错误'
          });
        }
        else
        {
          res.json({
            code: '10000',
            msg: '操作成功'
          });
        }
      
      console.log('OK');
  })
})

// 增加学生成绩
app.post('/add', (req, res) => {
  var  username=req.body.username;
  var  account=req.body.account;
  var  college=req.body.college;
  var  profession=req.body.profession;
  var  profession_score=req.body.profession_score;
  var  award_score=req.body. award_score;
  var ADD_SCORE = "insert into score(username, account, college, prefession, prefession_score, award_score) values(?,?,?,?,?,?)";
  var params = [username, account, college, profession, profession_score, award_score];
  connection.query(ADD_SCORE, params, function(error, result){
    if(error)
    {
      console.log(error.message);
    }else{
      console.log(result);
      res.json({
        code: 10000,
        msg: "添加成功"
      })
    }
  });
})

// 查询所有成绩
app.post('/getall', (req, res) => {
  var page = req.body.page;
  var limit = req.body.limit;
  console.log(page, limit)
  var start = (page - 1)*limit;
  // var sql1 = 'SELECT COUNT(*) as total FROM score';
  // var sql2 = 'SELECT * FROM score limit ' + start + ',10';
  var sql = 'SELECT COUNT(*) as total FROM score; SELECT * FROM score limit ' + start + ',10'; 
  connection.query(sql, function (err, results) {
    if (err){
        throw err
    }else{
      console.log(results[0][0].total)   
      console.log(results[1])  ;
      var allPage = parseInt(results[0][0].total)/10;
      var pageStr = allPage.toString();
      if (pageStr.indexOf('.')>0) {
        allPage = parseInt(pageStr.split('.')[0]) + 1; 
      }                          
      res.json({
        code: 10000,
        msg: "操作成功",
        data: results[1],
        total: allPage
      })
   }
  }) 
})








app.listen(3001, ()=>{
  // 打印一下
  console.log('http://127.0.0.1:3001')
})