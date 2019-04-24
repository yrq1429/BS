import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout, message, Breadcrumb } from "antd";
import { Form, Input, Button, Icon, Checkbox } from "antd";

import './index.scss'
import Header from "../../a_component/Header";
import Menu from "../../a_component/Menu";
import Footer from "../../a_component/Footer";
import Loading from "../../a_component/Loading";
import tools from "../../util/tools";
import Loadable from "react-loadable";
/** 普通组件 **/
// import { message } from "antd";
// const [NotFound, NoPower, MenuAdmin, PowerAdmin, RoleAdmin, UserAdmin] = [
//   () => import(`../../a_container/ErrorPages/404`),
//   () => import(`../../a_container/ErrorPages/401`),
//   () => import(`../../a_container/System/MenuAdmin`),
//   () => import(`../../a_container/System/PowerAdmin`),
//   () => import(`../../a_container/System/RoleAdmin`),
//   () => import(`../../a_container/System/UserAdmin`)
// ].map(item => {
//   return Loadable({
//     loader: item,
//     loading: Loading
//   });
// });
const { Content } = Layout;
const FormItem = Form.Item;

class ChangePassword extends Component {
  constructor (props) {
    super (props);
    this.state = {
      collapsed: false,
      menus: [
        {
          id: 1,
          title: "首页",
          icon: "home",
          url: "/home",
          parent: null,
          desc: "首页",
          sorts: 0,
          conditions: 1
        },
        {
          id: 2,
          title: "系统管理",
          icon: "setting",
          url: "/system",
          parent: null,
          desc: "系统管理目录分支",
          sorts: 1,
          conditions: 1
        },
        {
          id: 3,
          title: "查询学生成绩",
          icon: "user",
          url: "/studentsearch",
          parent: 2,
          desc: "系统管理/用户管理",
          sorts: 0,
          conditions: 1
        },
        {
          id: 4,
          title: "添加学生成绩",
          icon: "team",
          url: "/add",
          parent: 2,
          desc: "添加学生成绩",
          sorts: 1,
          conditions: 1
        },
        {
          id: 5,
          title: "奖学金设定",
          icon: "coffee",
          url: "/awardsetting",
          parent: 2,
          desc: "奖学金设定",
          sorts: 2,
          conditions: 1
        },
        {
          id: 6,
          title: "修改密码",
          icon: "appstore",
          url: "/changepassword",
          parent: 2,
          desc: "修改密码",
          sorts: 3,
          conditions: 1
        }
      ],
      location: ""
      
    }
  }

  onSubmit() {
    const form = this.props.form;
    form.validateFields((error, values) => {
      if (error) {
        return;
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;    
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
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Content className="content">
            <div className="page-home">
              <div className="box">
                <div className="title">
                  修改密码
                </div>
                <FormItem>
                {getFieldDecorator("username", {
                  rules: [
                    { max: 12, message: "最大长度为12位字符" },
                    {
                      required: true,
                      whitespace: true,
                      message: "请输入用户名"
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                    size="large"
                    id="username" // 为了获取焦点
                    placeholder="请输入账号"
                    onPressEnter={() => this.onSubmit()}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("oldpassword", {
                  rules: [
                    { required: true, message: "请输入旧的密码" },
                    { max: 18, message: "最大长度18个字符" }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    size="large"
                    type="password"
                    placeholder="请输入旧的密码"
                    onPressEnter={() => this.onSubmit()}
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("newpassword", {
                  rules: [
                    { required: true, message: "请输入新的密码" },
                    { max: 18, message: "最大长度18个字符" }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    size="large"
                    type="password"
                    placeholder="请输入新的密码"
                    onPressEnter={() => this.onSubmit()}
                  />
                )}
              </FormItem>
              <div style={{ lineHeight: "40px" }}>
                <Button
                  className="submit-btn"
                  size="large"
                  type="primary"
                  loading={this.state.loading}
                  onClick={() => this.onSubmit()}
                >
                  {this.state.loading ? "请稍后" : "修改"}
                </Button>
              </div>
              </div>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default Form.create()(ChangePassword);
