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
        "total":1,
        "id":""
      },
    }
    const _self = this;
  }

  componentDidMount() {
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
  componentWillMount() {
    // console.log(this.getCookie("account"));
    // console.log(this.getCookie("class"));
    const { pageData } = this.state;
    var teacher_id =  this.getCookie("teacher_id");
    pageData.id = teacher_id;
    var num = this.getCookie("account")
    if (num != "root") {
      this.setState({
        userInfo: this.props.location.query
      })
    } else {
      this.setState({
        userInfo: this.props.location.query,
        menus: menuData.rootMenu,
        pageData
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
    axios.post('/getByOwn', qs.stringify(data))
      .then(res => {
        this.setState({
          data: res.data.data,
          pageData: {
            "page": parseInt(res.data.page),
            "limit": 10,
            "total":res.data.total,
            "id": data.id
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
            title: '学号',
            dataIndex: 'account',
            width: '12%',
            editable: true,
          },
          {
            title: '班级',
            dataIndex: 'class',
            width: '12%',
            editable: true,
          },
          {
            title: '学年',
            dataIndex: 'date',
            width: '12%',
            editable: true,
          },
          {
            title: '姓名',
            dataIndex: 'username',
            width: '12%',
            editable: true,
          },
          {
            title: '学院',
            dataIndex: 'college',
            width: '12%',
            editable: true,
          },
          {
            title: '专业',
            dataIndex: 'prefession',
            width: '12%',
            editable: true,
          },
          {
            title: '专业成绩',
            dataIndex: 'prefession_score',
            width: '8%',
            editable: true,
          },
          {
            title: '获奖成绩',
            dataIndex: 'award_score',
            width: '8%',
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
                            onClick={() => this.save(form, record.id)}
                            style={{ marginRight: 8 }}
                          >
                            Save
                          </a>
                        )}
                      </EditableContext.Consumer>
                      <Popconfirm
                        title="Sure to cancel?"
                        onConfirm={() => this.cancel(record.id)}
                      >
                        <a>Cancel</a>
                      </Popconfirm>
                    </span>
                  ) : (
                    <div>
                      <a disabled={editingKey !== ''} onClick={() => this.edit(record.id)}>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <a disabled={editingKey !== ''} onClick={() => this.delete(record.id)}>删除</a>
                    </div>
                  )}
                </div>
              );
            },
          },
        ];
      }

      isEditing = record => record.id === this.state.editingKey;

      cancel = () => {
        this.setState({ editingKey: '' });
      };

      // 执行save保存函数
      handleUpdate = (data) => {
        console.log(data)
        axios.post('/update', qs.stringify(data))
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
            "total":1,
            "id": that.getCookie("teacher_id")
          }
          const newData = [...this.state.data];
          const index = newData.findIndex(item => key === item.id);
          if (index > -1) {
            console.log(newData)
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            console.log(newData[index])
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
          "total":1,
          "id": that.getCookie("teacher_id")
        }
        // alert("删除")
        axios.post("/delete", qs.stringify({id: key}))
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


  handleLogout = () => {
    this.props.history.push('/login')
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
            handleOut = { this.handleLogout }
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
                <div className="title">查看学生成绩</div>
              </div>
              <div className="options">
                管理成绩：<RadioGroup name="radiogroup" defaultValue="ownclass">
                          <Radio value="ownclass">所带班级成绩</Radio>
                          <Radio value="allclass" disabled>全部成绩</Radio>
                        </RadioGroup>
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
