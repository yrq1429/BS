import React, { Component } from 'react';
import './index.scss';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout, message, Breadcrumb } from "antd";
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
const { Option } = Select;
const FormItem = Form.Item;
class StudentSearch extends Component {

  constructor (props) {
    super (props);
    this.state = {
      collapsed: false,
      menus: menuData.menu,
      location: "",
      dataSource: [],
      columns : [
        {
        title: '姓名',
        dataIndex: 'username',
        key: 'username',
        }, {
          title: '班级',
          dataIndex: 'class',
          key: 'class',
        },{
          title: '年份',
          dataIndex: 'date',
          key: 'date',
        },{
          title: '学号',
          dataIndex: 'account',
          key: 'account',
        },
        {
          title: '学院',
          dataIndex: 'college',
          key: 'college',
        },
        {
          title: '专业',
          dataIndex: 'prefession',
          key: 'prefession',
        },
        {
          title: '专业成绩',
          dataIndex: 'prefession_score',
          key: 'prefession_score',
        },
        {
          title: '获奖成绩',
          dataIndex: 'award_score',
          key: 'award_score',
        }
      ],
      account:''
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
    console.log(this.state.account)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post("/getone", {"account":this.state.account})
        .then(res => {
          if (res.data.code == 10004) {
            message.info("未查到该生成绩")
          } else if (res.data.code == 10000) {
            message.info("查询成功");
            this.setState({
              dataSource: res.data.data
            })
            this.props.form.resetFields();                          
          }
        })
      } else {
        console.log("查询有误")
      }
    });
  }

  handleChangeAccount = (e) => {
    const { account } = this.state;
    var newaccount = e.target.value;
    this.setState({
      account: newaccount
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, columns } = this.state;
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
              <Breadcrumb.Item href="">查询学生成绩</Breadcrumb.Item>             
            </Breadcrumb>
          </div>
          <Content className="content">
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
              <Form.Item
                label="请输入学号"
              >
                {getFieldDecorator('note', {
                  rules: [{ required: true, message: 'Please input your note!' }],
                })(
                  <Input
                    onChange = { e => this.handleChangeAccount(e) }
                  />
                )}
              </Form.Item>
              <Form.Item
                wrapperCol={{ span: 12, offset: 5 }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>

            <Table dataSource={dataSource} columns={ columns }/>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default Form.create()(StudentSearch);
