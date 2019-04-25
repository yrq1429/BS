import React, { Component } from 'react';
import './index.scss';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout, message, Breadcrumb, Radio,Row, Col   } from "antd";
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

const { Content } = Layout;
const { Option } = Select;
const FormItem = Form.Item;
class AddScore extends Component {
  constructor (props) {
    super (props);
    this.state = {
      collapsed: false,
      menus: menuData.menu,
      location: "",
      
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        alert("已添加")
      } else {
        
      }
    });
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
                  <Input />
                )}
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
                  <Input type="password" />
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
                  <Input type="password" />
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
                  <Input type="password" />
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
                  <Input type="password" />
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
                  <Input type="password" />
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
