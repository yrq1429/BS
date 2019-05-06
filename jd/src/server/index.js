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
  var  account=req.body.account;
  var  password=req.body.password;
  console.log(account, password)
  var selectSQL = "select * from user where account = '"+account+"' and password = '"+password+"'";
  connection.query(selectSQL,(err,result) => {
      if (err) throw  err;
      // console.log(result)
      if(result.length == 0) {
          // console.log("10004")
          res.send({
            code: 10004,
            msg: '用户名或密码错误'
          });
          res.end();
      } else{
          // console.log("10000")
          res.send({
            code: 10000,
            msg: '操作成功'
          });
          res.end();
      }      
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
  var sql = 'SELECT COUNT(*) as total FROM score; SELECT * FROM score limit ' + start + ','+(10*page); 
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err){
      console.log(err)
    }else{
      console.log(results)
      var allPage = parseInt(results[0][0].total)/10;
      var pageStr = allPage.toString();
      if (pageStr.indexOf('.')>0) {
        allPage = parseInt(pageStr.split('.')[0]) + 1; 
      }                          
      res.json({
        code: 10000,
        msg: "操作成功",
        data: results[1],
        total: allPage,
        page: page,
        limit: limit
      })
   }
  })    
})

// 按学号查询成绩
app.post('/getone', (req, res) => {
  var account = req.body.account;
  var sql = "select * from score where account = '"+ account +"'";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("查询失败")
    }  else {
      console.log(result)
      if (result.length == 0) {
        res.send({
          code: 10004,
          msg: "没有该生成绩"
        })
      } else {
        res.send({
          code: 10000,
          msg: "查询成功",
          data: result
        })
      }
    }
  })
})







app.listen(3001, ()=>{
  // 打印一下
  console.log('http://127.0.0.1:3001')
})