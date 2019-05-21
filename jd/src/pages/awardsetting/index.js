import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout, message, Breadcrumb } from "antd";
import { Table } from 'antd';
import {
  Form, Select, Input, Button,
} from 'antd';
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
const { Option } = Select;
const FormItem = Form.Item;
class AwardSetting extends Component {
  constructor (props) {
    super (props);
    this.state = {
      collapsed: false,
      menus: menuData.menu,
      location: "",
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
        },
        {
          title: '奖学金种类',
          dataIndex: 'award_type',
          key: 'award_type',
        }
      ],
      dataSource: [],
      params: {
        "college":"软件学院",
        "date": "2015-2016"
      },
      showTable: false,
      data: []
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
    const { data } = this.state;
    console.log(this.getCookie("account"));
    var num = this.getCookie("account")
    if (num != "root") {
      this.setState({
        userInfo: this.props.location.query
      })
    } else {
      axios.post("/setaward")
        .then(res => {
          var nums = res.data.total.total;
          var first = parseInt(nums*0.05)+1;
          var second = parseInt(nums*0.1)+1;
          var third = parseInt(nums*0.15)+1;
          var newData = res.data.data.slice(0, first+second+third);          
          for (let i = 0; i < first; i++) {
            newData[i].award_type = "一等奖"
          }
          for (let j = first; j < first+second; j++) {
            newData[j].award_type = "二等奖"
          }
          for (let k = first+second; k < first+second+third; k++) {
            newData[k].award_type = "三等奖"            
          }
          this.setState({
            userInfo: this.props.location.query,
            menus: menuData.rootMenu,
            data: newData
          }, () => {
            console.log("aaaa")
            console.log(this.state.data);
            this.insertData(this.state.data);
          })
        })
      }
  }


  insertData = (data) => {
    axios.post("/setawardfinall", data)
      .then( res => {
        console.log(res)
      })
  }
  compare = (pro) => { 
    return function (obj1, obj2) { 
        var val1 = obj1[pro]; 
        var val2 = obj2[pro]; 
        if (val1 < val2 ) { //正序
            return 1; 
        } else if (val1 > val2 ) { 
            return -1; 
        } else { 
            return 0; 
        } 
    } 
} 

  handleSubmit = (e) => {
    e.preventDefault();
    const { score, params } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post("/getaward",qs.stringify(params))
          .then(res => {
            res.data.data.sort(this.compare("sumscore"))
            this.setState({
              dataSource:res.data.data
            }, () => {
              message.info("查找成功")
            })
          })
      }
    });
  }

  handleChangeSelect = (value) => {
    const { params } = this.state;
    params.college = value;
    this.setState({
      params
    })
  }

  handleChangeSelectDate = (value) => {
    const { params } = this.state;
    params.date = value;
    this.setState({
      params
    })
  }

  getBtn = () => {
    return (
      <div className="btn-to-award">
       <Button type="primary" onClick = { this.handleToAward }>
        按要求评定奖学金 
      </Button>
      </div>
    )
  }

  handleToAward = () => {
    const { showTable } = this.state;
    this.setState({
      showTable: !showTable
    })
  }

  getTable = () => {
    const {dataSource,columns, showTable } = this.state;    
    return (
      <Content className="content">
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
          <Form.Item
            label="学院">
                      <Select value={this.state.params.college} style={{ width: 350 }} 
                        onChange={this.handleChangeSelect}>
                        <Option value="软件学院">软件学院</Option>
                        <Option value="信工学院">信工学院</Option>
                        <Option value="体育学院">体育学院</Option>
                        <Option value="物理学院">物理学院</Option>
                        <Option value="测绘学院">测绘学院</Option>
                        <Option value="教育学院">教育学院</Option> 
                        <Option value="研究生学院">研究生学院</Option>     
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="年份"
                    >
                      <Select value={this.state.params.date} style={{ width: 350 }} 
                        onChange={this.handleChangeSelectDate}>
                        <Option value="2015-2016">2015-2016</Option>
                        <Option value="2016-2017">2016-2017</Option>
                        <Option value="2017-2018">2017-2018</Option>
                        <Option value="2018-2019">2018-2019</Option>                  
                      </Select>
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{ span: 12, offset: 5 }}
                    >
                      <Button type="primary" onClick = {this.handleSubmit}>
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>

                  <Table dataSource={dataSource} columns={ columns }/>
                </Content>
    )
  }

  render() {
    const {dataSource,columns, showTable } = this.state;
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
              <Breadcrumb.Item href="/">奖学金设定</Breadcrumb.Item>              
            </Breadcrumb>
          </div>
          <Content className="content">
            <div className="page-home">
              <div className="box">
                <div className="title">
                  关于奖学金的设定
                </div>
                <div className="info">
                  奖学金的种类有三种：一等奖学金、二等奖学金、三等奖学金
                </div>
                <div className="info">
                  奖学金的人数：一等奖为5%、二等奖10%、三等奖15%
                </div>
                {
                  this.getTable()
                }        
              </div>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default Form.create()(AwardSetting);
