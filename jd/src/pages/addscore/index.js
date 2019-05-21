import React, { Component } from 'react';
import './index.scss';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout, message, Breadcrumb, Radio,Row, Col  } from "antd";
import {
  Form, Select, Input, Button,
} from 'antd';
import { Table } from 'antd'
import './index.scss'
import Header from "../../a_component/Header";
import Menu from "../../a_component/Menu";
import Footer from "../../a_component/Footer";
import Loading from "../../a_component/Loading";
import tools from "../../util/tools";
import Loadable from "react-loadable";
import menuData from '../menu-data.json';
import axios from 'axios';
import qs from 'qs';
const { Content } = Layout;
const { Option, OptGroup  } = Select;
const FormItem = Form.Item;
class AddScore extends Component {
  constructor (props) {
    super (props);
    this.state = {
      collapsed: false,
      menus: menuData.menu,
      location: "",
      score: {
        username: '',
        account: '',
        college: '',
        profession: '',
        profession_score: '',
        award_score: '',
        date: "2015-2016",
        class: "",
        teacher_id: "t1"
      }
    }
  }

  getCookie = (sName) =>{
    var aCookie = document.cookie.split("; ");
    for (var i=0; i < aCookie.length; i++)
    {
    var aCrumb = aCookie[i].split("=");
    if (sName == aCrumb[0])
    return unescape(aCrumb[1]);
    }
    return null;
  }

  componentDidMount() {
    console.log(this.getCookie("account"));
      var num = this.getCookie("account")
      if (num === "root") {
        this.setState({
          menus: menuData.rootMenu
        })
      } 
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { score } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(this.state.score);
        axios.post('/add', qs.stringify(
          score
        ))
        .then(res => {
          console.log(res);
          if (res.data.code === 10000) {
            message.info('添加成功');  
            this.props.form.resetFields();
          } else if (res.data.code === 10004) {
            message.info('添加失败')
            this.props.form.resetFields();
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
    });
  }

  handleAddScore = (e, type) => {
    const { score } = this.state;
    switch (type) {
      case "username":
        score.username = e.target.value;
        break;
      case "account":
        score.account = e.target.value;
        break;
      case "college":
        score.college = e.target.value;
        break;
      case "profession":
        score.profession = e.target.value;
        break;
      case "profession_score":
        score.profession_score = e.target.value;
        break;
      case "award_score":
        score.award_score = e.target.value;
        break;
      case "class":
        score.class = e.target.value;
        break;
      default:
        break;
    }
    this.setState({
      score
    })
  }

  handleChangeSelect = (value) => {
    const { score } = this.state;
    console.log(value)
    score.date = value;
    this.setState({
      score
    }, () => {
      console.log(score.date.key)
    })    
  }

  handleChangeTeacher = (value) => {
    const { score } = this.state;
    console.log(value)
    score.teacher_id = value;
    this.setState({
      score
    }, () => {
      console.log(score.date.key)
    })   
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const RadioGroup = Radio.Group;
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Layout className="page-basic">
        <Menu
          data={this.state.menus}
          collapsed={this.state.collapsed}
          location={this.state.location}
        />
        <Layout>
          <Header
            collapsed={this.state.collapsed}
          />
          <div className="menus">
            <Breadcrumb separator="/">
              <Breadcrumb.Item href="/home">首页</Breadcrumb.Item>
              <Breadcrumb.Item href="">添加学生成绩</Breadcrumb.Item>             
            </Breadcrumb>
          </div>
          <Content className="content">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item
                label="姓名"
              >
                {getFieldDecorator('username', {
                  rules: [
                    { max: 12, message: "最大长度为12位字符" },
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入用户名"
                    }
                  ],
                })(
                  <Input 
                    onChange = { (e) => this.handleAddScore(e, "username") }
                  />
                )}
              </Form.Item>
              <Form.Item
                label="班级"
              >
                {getFieldDecorator('class', {
                  rules: [
                    { max: 12, message: "最大长度为12位字符" },
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入班级"
                    }
                  ],
                })(
                  <Input 
                    onChange = { (e) => this.handleAddScore(e, "class") }
                  />
                )}
              </Form.Item>
              <Form.Item
                label="年份"
              >
                <Select value={this.state.score.date} style={{ width: 350 }} 
                  onChange={this.handleChangeSelect}>
                  <Option value="2015-2016">2015-2016</Option>
                  <Option value="2016-2017">2016-2017</Option>
                  <Option value="2017-2018">2017-2018</Option>
                  <Option value="2018-2019">2018-2019</Option>                  
                </Select>
              </Form.Item>
              <Form.Item
                label="教师"
              >
                <Select value={this.state.score.teacher_id} style={{ width: 350 }} 
                  onChange={this.handleChangeTeacher}>
                  <Option value="t1">t1</Option>
                  <Option value="t2">t2</Option>
                  <Option value="t3">t3</Option>
                  <Option value="t4">t4</Option>
                  <Option value="t5">t5</Option>
                  <Option value="t6">t6</Option>
                  <Option value="t7">t7</Option>                 
                </Select>
              </Form.Item>
              <Form.Item
                label="学号"
              >
                {getFieldDecorator('account', {
                  rules: [
                    { max: 12, message: "最大长度为12位字符" },
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入学号"
                    }
                  ],
                })(
                  <Input 
                    onChange = { (e) => this.handleAddScore(e, "account") }                    
                  />
                )}
              </Form.Item>
              <Form.Item
                label="学院"
              >
                {getFieldDecorator('college', {
                  rules: [
                    { max: 12, message: "最大长度为12位字符" },
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入学院"
                    }
                  ],
                })(
                  <Input 
                  onChange = { (e) => this.handleAddScore(e, "college") }                    
                  />
                )}
              </Form.Item>
              <Form.Item
                label="专业"
              >
                {getFieldDecorator('profession', {
                  rules: [
                    { max: 12, message: "最大长度为12位字符" },
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入专业"
                    }
                  ],
                })(
                  <Input 
                  onChange = { (e) => this.handleAddScore(e, "profession") }                    
                  />
                )}
              </Form.Item>

              <Form.Item
                label="专业综合成绩"
              >
                {getFieldDecorator('profession_score', {
                  rules: [
                    { max: 12, message: "最大长度为12位字符" },
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入专业综合成绩"
                    }
                  ],
                })(
                  <Input 
                  onChange = { (e) => this.handleAddScore(e, "profession_score") }                                      
                  />
                )}
              </Form.Item>
              <Form.Item
                label="获奖成绩分数"
              >
                {getFieldDecorator('award_score', {
                  rules: [
                    { max: 12, message: "最大长度为12位字符" },
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入获奖成绩得分"
                    }
                  ],
                })(
                  <Input 
                  onChange = { (e) => this.handleAddScore(e, "award_score") }                   
                  />
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">添加</Button>
              </Form.Item>
            </Form>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default Form.create()(AddScore);
