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
class AddTeacher extends Component {
  constructor (props) {
    super (props);
    this.state = {
      collapsed: false,
      menus: menuData.menu,
      location: "",
      score: {
        username: '',
        account: '',
        password: ''
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
    if (num != "root") {
      this.setState({
        userInfo: this.props.location.query
      })
    } else {
      this.setState({
        userInfo: this.props.location.query,
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
        axios.post('/addteacher', qs.stringify(
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
      case "password":
        score.password = e.target.value;
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
  handleLogout = () => {
    this.props.history.push('/login')
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
            handleOut = { this.handleLogout }
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
                label="账号"
              >
                {getFieldDecorator('account', {
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
                    onChange = { (e) => this.handleAddScore(e, "account") }
                  />
                )}
              </Form.Item>
              
              <Form.Item
                label="密码"
              >
                {getFieldDecorator('password', {
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
                    onChange = { (e) => this.handleAddScore(e, "password") }                    
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

export default Form.create()(AddTeacher);
