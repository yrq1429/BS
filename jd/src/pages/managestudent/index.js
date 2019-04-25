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

  getTable = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    const FormItem = Form.Item;
    const EditableContext = React.createContext();

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
        this.state = { data, editingKey: '' };
        this.columns = [
          {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
          },
          {
            title: 'age',
            dataIndex: 'age',
            width: '15%',
            editable: true,
          },
          {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
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
                            onClick={() => this.save(form, record.key)}
                            style={{ marginRight: 8 }}
                          >
                            Save
                          </a>
                        )}
                      </EditableContext.Consumer>
                      <Popconfirm
                        title="Sure to cancel?"
                        onConfirm={() => this.cancel(record.key)}
                      >
                        <a>Cancel</a>
                      </Popconfirm>
                    </span>
                  ) : (
                    <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>Edit</a>
                  )}
                </div>
              );
            },
          },
        ];
      }

      isEditing = record => record.key === this.state.editingKey;

      cancel = () => {
        this.setState({ editingKey: '' });
      };

      save(form, key) {
        form.validateFields((error, row) => {
          if (error) {
            return;
          }
          const newData = [...this.state.data];
          const index = newData.findIndex(item => key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            this.setState({ data: newData, editingKey: '' });
          } else {
            newData.push(row);
            this.setState({ data: newData, editingKey: '' });
          }
        });
      }

      edit(key) {
        this.setState({ editingKey: key });
      }

      render() {
        const components = {
          body: {
            cell: EditableCell,
          },
        };

        const columns = this.columns.map((col) => {
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
              components={components}
              bordered
              dataSource={this.state.data}
              columns={columns}
              rowClassName="editable-row"
              pagination={{
                onChange: this.cancel,
              }}
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
            {
              this.getTable()
            }
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default Form.create()(ManageStudent);
