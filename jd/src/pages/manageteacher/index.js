import React, { Component } from 'react';
import './index.scss';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout, message, Breadcrumb } from "antd";
import {
  Table, Input, InputNumber, Popconfirm, Form,
} from 'antd';
import {
  Select, Button,
} from 'antd';
import './index.scss'
import Header from "../../a_component/Header";
import Menu from "../../a_component/Menu";
import Footer from "../../a_component/Footer";
import Loading from "../../a_component/Loading";
import tools from "../../util/tools";
import Loadable from "react-loadable";
import menuData from '../menu-data.json';
import { Radio } from 'antd';
import axios from 'axios';
import qs from 'qs';
const RadioGroup = Radio.Group;
const { Content } = Layout;
const { Option } = Select;
const FormItem = Form.Item;
class ManageStudent extends Component {

  constructor (props) {
    super (props);
    this.state = {
      collapsed: false,
      menus: menuData.menu,
      location: "",
      data: [],
      pageData: {
        "page": 1,
        "limit": 10,
        "total":1
      },
    }
    const _self = this;
  }

  componentWillMount() {
    this.getData(this.state.pageData)
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        
      }
    });
  }

  // 请求数据
  getData = (data) => {
    axios.post('/getallteacher', qs.stringify(data))
      .then(res => {
        console.log(res);
        console.log("aaa")
        this.setState({
          data: res.data.data,
          pageData: {
            "page": parseInt(res.data.page),
            "limit": 10,
            "total":res.data.total
          }
        })
      })
  }

  changePage = (current) => {
    const { pageData } = this.state;
    pageData.page = current;
    this.setState({
      pageData
    }, () => {
      this.getData(pageData)
    })
  }

  getTable = () => {
    const { data, pageData } = this.state;
    console.log(pageData)
    const that = this;
    const FormItem = Form.Item;
    const EditableContext = React.createContext();
    const paginationProps = {
      showQuickJumper: false,
      current: pageData.page,
      total: pageData.total*10,
      onChange: (current) => this.changePage(current),
    }
    class EditableCell extends React.Component {
      getInput = () => {
        if (this.props.inputType === 'number') {
          return <InputNumber />;
        }
        return <Input />;
      };

      render() {
        const {
          editing,
          dataIndex,
          title,
          inputType,
          record,
          index,
          ...restProps
        } = this.props;
        return (
          <EditableContext.Consumer>
            {(form) => {
              const { getFieldDecorator } = form;
              return (
                <td {...restProps}>
                  {editing ? (
                    <FormItem style={{ margin: 0 }}>
                      {getFieldDecorator(dataIndex, {
                        rules: [{
                          required: true,
                          message: `Please Input ${title}!`,
                        }],
                        initialValue: record[dataIndex],
                      })(this.getInput())}
                    </FormItem>
                  ) : restProps.children}
                </td>
              );
            }}
          </EditableContext.Consumer>
        );
      }
    }

    class EditableTable extends React.Component {
      constructor(props) {
        super(props);
        this.state = { data, editingKey: '' }
        this.columns = [
          // {
          //   title: "",
          //   dataIndex: 'id',
          //   width: '5%',
          //   editable: true,
          // },
          {
            title: '账号',
            dataIndex: 'account',
            width: '30%',
            editable: true,
          },
          {
            title: '用户名',
            dataIndex: 'username',
            width: '30%',
            editable: true,
          },
          {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
              const { editingKey } = this.state;
              const editable = this.isEditing(record);
              return (
                <div>
                  {editable ? (
                    <span>
                      <EditableContext.Consumer>
                        {form => (
                          <a
                            href="javascript:;"
                            onClick={() => this.save(form, record.userid)}
                            style={{ marginRight: 8 }}
                          >
                            Save
                          </a>
                        )}
                      </EditableContext.Consumer>
                      <Popconfirm
                        title="Sure to cancel?"
                        onConfirm={() => this.cancel(record.userid)}
                      >
                        <a>Cancel</a>
                      </Popconfirm>
                    </span>
                  ) : (
                    <div>
                      <a disabled={editingKey !== ''} onClick={() => this.edit(record.userid)}>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <a disabled={editingKey !== ''} onClick={() => this.delete(record.userid)}>删除</a>
                    </div>
                  )}
                </div>
              );
            },
          },
        ];
      }

      isEditing = record => record.userid === this.state.editingKey;

      cancel = () => {
        this.setState({ editingKey: '' });
      };

      // 执行save保存函数
      handleUpdate = (data) => {
        axios.post('/updateteacher', qs.stringify(data))
          .then(res => {
            console.log(res)
          })
      }

      save(form, key) {
        form.validateFields((error, row) => {
          if (error) {
            return;
          }
          const newPageData = {
            "page": 1,
            "limit": 10,
            "total":1
          }
          const newData = [...this.state.data];
          console.log(newData)
          const index = newData.findIndex(item => key === item.userid);
          if (index > -1) {
            console.log(newData)
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            console.log("----------");
            console.log(newData[index])
            console.log("----------");            
            this.setState({ editingKey: '' },() => {
              this.handleUpdate(newData[index])
              that.getData(newPageData)              
            });
          } else {
            newData.push(row);
            this.setState({ data: newData, editingKey: '' });
          }
        });
      }

      edit(key) {
        console.log(key)
        this.setState({ editingKey: key });
      }
      delete(key) {
        const newPageData = {
          "page": 1,
          "limit": 10,
          "total":1
        }
        // alert("删除")
        axios.post("/deleteteacher", qs.stringify({userid: key}))
          .then(res => {
            console.log(res);
            that.getData(newPageData)
          })
      }

      render() {
        const components = {
          body: {
            cell: EditableCell,
          },
        };

        const columns = this.columns.map((col, index) => {
          if (!col.editable) {
            return col;
          }
          return {
            ...col,
            onCell: record => ({
              record,
              inputType: col.dataIndex === 'age' ? 'number' : 'text',
              dataIndex: col.dataIndex,
              title: col.title,
              editing: this.isEditing(record),
            }),
          };
        });

        return (
          <EditableContext.Provider value={this.props.form}>
            <Table
              rowKey={record => record.key}
              components={components}
              bordered
              dataSource={this.state.data}
              columns={columns}
              rowClassName="editable-row"
              pagination = {paginationProps}
            />
          </EditableContext.Provider>
        );
      }
    }

    const EditableFormTable = Form.create()(EditableTable);

    return (
      <EditableFormTable />
    )
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
            <div className="page-home">
              <div className="box">
                <div className="title">管理教师</div>
              </div>
              {
                this.getTable()
              }
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default Form.create()(ManageStudent);
