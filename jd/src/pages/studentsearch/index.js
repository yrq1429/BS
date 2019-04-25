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
      dataSource: [{
        key: '1',
        name: '刘德华',
        sex: '男',
        nums: "152181401",
        college: "软件学院",
        de_score: 80,
        ti_score: 80,
        zhi_score: 80, 
        avg_score: 80,     
      }],
      columns : [
        {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        }, {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
        }, {
          title: '学号',
          dataIndex: 'nums',
          key: 'nums',
        },
        {
          title: '学院',
          dataIndex: 'college',
          key: 'college',
        },
        {
          title: '德育成绩',
          dataIndex: 'de_score',
          key: 'de_score',
        },
        {
          title: '体育成绩',
          dataIndex: 'ti_score',
          key: 'ti_score',
        },
        {
          title: '智育成绩',
          dataIndex: 'zhi_score',
          key: 'zhi_score',
        }, {
          title: "综合成绩",
          dataIndex: "avg_score",
          key: "avg_score"
        }
      ]
      
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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
                  <Input />
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
