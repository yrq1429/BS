var User = require("../model/user.js")
var mongoose = require('mongoose');
// var DB_URL = 'mongodb://localhost:27017/school';
const bodyParser = require("body-parser");
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
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
      console.log(result)
      if(result.length == 0) {
          // console.log("10004")
          res.send({
            code: 10004,
            msg: '用户名或密码错误'
          });
          res.end();
      } else{
          // console.log(result[0].username)
          const cookieData = {"account":result[0].account,"username":result[0].username,"password":result[0].password};
          res.cookie("account",result[0].account,{maxAge:1000*60*60*24});
          // res.cookie("username",base64.b64encode(result[0].username.encode('utf-8')),{maxAge:1000*60*60}); 
          res.cookie("password",result[0].password,{maxAge:1000*60*60*24});
          res.cookie("teacher_id",result[0].teacher_id,{maxAge:1000*60*60*24});          
          // console.log({"account":result[0].account,"username":result[0].username,"password":result[0].password})
          res.send({
            code: 10000,
            msg: '操作成功',
            data: result
          });
          res.end();
      }      
  })
})

// 获取用户名
app.post('/getname',function (req,res) {
  var account=req.body.account;
  var selectSQL = "select * from user where account = '"+account+"'";
  connection.query(selectSQL,(err,result) => {
      if (err) throw  err;
      if(result.length == 0) {
          // console.log("10004")
          res.send({
            code: 10004,
            msg: '获取失败'
          });
          res.end();
      } else{
          res.send({
            code: 10000,
            msg: '操作成功',
            data: result[0]
          });
          res.end();
      }      
  })
})

// 增加学生成绩
app.post('/add', (req, res) => {
  var  username=req.body.username;
  var  className=req.body.class;  
  var  date=req.body.date;  
  var  account=req.body.account;
  var  college=req.body.college;
  var  profession=req.body.profession;
  var  profession_score=req.body.profession_score;
  var  award_score=req.body.award_score;
  var  teacher_id=req.body.teacher_id;  
  var ADD_SCORE = "insert into score(username,class,date, account, college, prefession, prefession_score, award_score, teacher_id) values(?,?,?,?,?,?,?,?,?)";
  var params = [username,className,date, account, college, profession, profession_score, award_score,teacher_id];
  console.log(params)
  connection.query(ADD_SCORE, params, function(error, result){
    if(error)
    {
      console.log(error.message);
      res.json({
        code: 10004,
        msg: "添加失败"
      })
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
      // console.log(results)
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

// 查询奖学金名单
app.post('/getallaward', (req, res) => {
  var college = req.body.college;
  var date = req.body.date;
  var params = [college, date];
  var sql = 'SELECT * FROM award where college = ? and date = ?'; 
  console.log(sql);
  connection.query(sql, params, function (err, results) {
    if (err){
      console.log(err)
    }else{                         
      res.json({
        code: 10000,
        msg: "操作成功",
        data: results,
        // total: allPage,
        // page: page,
        // limit: limit
      })
   }
  })    
})


// 查询教师所带的班级
app.post('/getByOwn', (req, res) => {
  var page = req.body.page;
  var limit = req.body.limit;
  var id = req.body.id;
  var start = (page - 1)*limit;
  var sql = 'SELECT COUNT(*) as total FROM score where teacher_id = ?; SELECT * FROM score where teacher_id = ? limit ' + start + ','+(10*page); 
  var params = [id,id];
  console.log(sql);
  connection.query(sql, params, function (err, results) {
    if (err){
      console.log(err)
    }else{
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

// 查询所有教师
app.post('/getallteacher', (req, res) => {
  var page = req.body.page;
  var limit = req.body.limit;
  // console.log(page, limit)
  var start = (page - 1)*limit;
  var sql = 'SELECT COUNT(*) as total FROM user; SELECT * FROM user where type = "teacher" limit ' + start + ','+(10*page); 
  // console.log(sql);
  connection.query(sql, function (err, results) {
    if (err){
      // console.log(err)
    }else{
      // console.log(results)
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
      // console.log(result)
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

// 修改密码
app.post('/changepwd', (req, res) => {
  console.log(req.body)
  var account = req.body.account;
  var oldpassword = req.body.oldpassword;  
  var newpassword = req.body.newpassword;
  var userModSql = 'UPDATE user SET password = ? WHERE account = ?';
  var userModSql_Params = [newpassword, account];
  connection.query(userModSql,userModSql_Params, (err, result) => {
    if(err){
          console.log('[UPDATE ERROR] - ',err.message);
          return;
    }else {
      if (result.length == 0) {
        res.send({
          code: 10004,
          msg: "修改失败"
        })
      } else {
        res.cookie("account",req.body.account,{maxAge:1000*60*60});
        res.cookie("password",req.body.newpassword,{maxAge:1000*60*60});
        res.send({
          code: 10000,
          msg: "修改成功"
        })
      }
      
    }
  })
})

// 修改数据功能
app.post('/update', (req, res) => {
  console.log(req.body)
  var newId = req.body.id;
  var newusername = req.body.username;
  var newaccount = req.body.account;
  var newcollege = req.body.college;
  var newprefession = req.body.prefession;
  var newprefession_score = req.body.prefession_score;
  var newaward_score = req.body.award_score;
  var newclass = req.body.class;
  var newdate = req.body.date;
  var sql = "UPDATE score SET username = ?,account = ?,college = ?,prefession = ?,prefession_score = ?,award_score = ?,class = ?,date = ? WHERE id = ?";
  var params = [newusername, newaccount, newcollege, newprefession, newprefession_score, newaward_score,newclass, newdate, newId];
  connection.query(sql,params, (err, result) => {
    if(err){
          console.log('[UPDATE ERROR] - ',err.message);
          return;
    }else {
      if (result.length == 0) {
        res.send({
          code: 10004,
          msg: "修改失败"
        })
      } else {
        res.send({
          code: 10000,
          msg: "修改成功"
        })
      }
      
    }
  })
  
})

// 修改教师信息
app.post('/updateteacher', (req, res) => {
  console.log(req.body)
  var newId = req.body.userid;
  var newusername = req.body.username;
  var newaccount = req.body.account;
  var sql = "UPDATE user SET username = ?,account = ? where userid = ?";
  var params = [newusername, newaccount, newId];
  
  connection.query(sql,params, (err, result) => {
    if(err){
          console.log('[UPDATE ERROR] - ',err.message);
          return;
    }else {
      if (result.length == 0) {
        res.send({
          code: 10004,
          msg: "修改失败"
        })
      } else {
        res.send({
          code: 10000,
          msg: "修改成功"
        })
      }
      
    }
  })
  
})

// 删除成绩记录
app.post("/delete", (req, res) => {
  var newId = req.body.id;
  var params = [newId]
  var sql = `delete from score where id = ?`;
  connection.query(sql, params, (err, result) => {
    if (result.length === 0) {
      console.log("error")
    } else{
      res.send({
        code: 10000,
        msg: "删除成功"
      })
    }
  })
})

// 删除教师
app.post("/deleteteacher", (req, res) => {
  var newId = req.body.userid;
  var params = [newId]
  var sql = `delete from user where userid = ?`;
  connection.query(sql, params, (err, result) => {
    if (result.length === 0) {
      console.log("error")
    } else{
      res.send({
        code: 10000,
        msg: "删除成功"
      })
    }
  })
})

// 添加教师
app.post('/addteacher', (req, res) => {
  var  username=req.body.username;
  var  account=req.body.account;
  var  password=req.body.password;  
  var  type = "teacher"
  var ADD_SCORE = "insert into user(username,account,password,type) values(?,?,?,?)";
  var params = [username,account,password,type];
  console.log(ADD_SCORE)
  console.log(params)
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

// 奖学金评定接口
app.post('/setaward', (req, res) => {
  var  date = "2015-2016"
  var  college = "软件学院"
  var SET_AWARD = "SELECT COUNT(*) as total FROM score where date = ? and college = ? ;select id, username, account, class,college, prefession, prefession_score,award_score,date,sum(prefession_score)+sum(award_score) as sumscore FROM `score` where date = ? and college = ?group by id order by sumscore desc";
  var params = [date,college,date,college];
  connection.query(SET_AWARD, params, function(error, result){
    if(error)
    {
      console.log(error.message);
    }else{
      console.log(result);
      res.json({
        code: 10000,
        msg: "添加成功",
        data: result[1],
        total: result[0][0]
      })
    }
  });
})

// 
app.post('/setawardfinall', (req, res) => {
  console.log(req.body)
  for (let i = 0; i < req.body.length; i++) {
    var sql = "insert into award(id,account,username,class,college, prefession, prefession_score, award_score, award_type,date,sumscore) values (?,?,?,?,?,?,?,?,?,?,?)";
    var id = req.body[i].id;
    var username = req.body[i].username;
    var account = req.body[i].account;
    var college = req.body[i].college;    
    var classa = req.body[i].class;
    var prefession = req.body[i].prefession;
    var prefession_score = req.body[i].prefession_score;
    var award_score = req.body[i].award_score;
    var sumscore = req.body[i].sumscore;
    var date = req.body[i].date;
    var award_type = req.body[i].award_type;    
    var params = [id,account,username, classa,college, prefession, prefession_score, award_score,award_type,date, sumscore];
    connection.query(sql,params, function(error, result){
      if(error)
        {
          try {
            res.json({
              code: 10004,
              msg:"插入失败"
            })
          } catch (error) {
            console.log(error)
          }
        }else{
          if (result.length !== 0) {
            res.json({
              code: 10000,
              msg:"插入成功"
            })
          }
        }
    });
  }
})

//
app.post('/getaward', (req, res) => {
    var college = req.body.college;
    var date = req.body.date;
    console.log(college, date)
    var sql = "select * from award where college = ? and date = ?";
    var params = [college, date]
    connection.query(sql,params, function(error, result){
      if (error) {
        try {
          res.json({
            code: 10004,
            msg:"查看失败"
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log(result);
        res.json({
          code: 10000,
          msg: "查找成功",
          data: result
        })
      }
        
    });
})





app.listen(3001, ()=>{
  // 打印一下
  console.log('http://127.0.0.1:3001')
})