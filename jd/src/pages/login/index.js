import React from "react";
import "./index.scss";
import Vcode from "react-vcode";
import { Form, Input, Button, Icon, Checkbox, message } from "antd";
import CanvasBack from '../../a_component/CanvasBack';
import axios from 'axios';
import qs from 'qs';
const FormItem = Form.Item;
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rememberPassword: false, // 是否记住密码
      loginData: {
        account: '',
        password: ''
      }
    };
  }


  // 用户提交登录
  onSubmit() {
    const form = this.props.form;
    const { loginData } = this.state;
    form.validateFields((error, values) => {
      if (error) {
        return;
      } else {
        axios.post('/login', qs.stringify(
                loginData
              ))
              .then(res => {
                console.log(res);
                if (res.data.code === 10000) {
                  message.info('登录成功');                  
                  setTimeout(() => {
                    this.props.history.push({pathname: '/home',query: res.data.data[0]});                    
                  }, 1500);
                } else if (res.data.code === 10004) {
                  message.info('用户名或密码错误')
                }
              })
              .catch(err => {
                console.log(err)
              })
      }

    });
  }


  // 记住密码按钮点击
  onRemember(e) {
    alert('onRe')
  }

  handleChangeLogin = (e, type) => {
    const { loginData } = this.state;
    switch (type) {
      case "account":
        loginData.account = e.target.value
        break;
      case "password":
        loginData.password = e.target.value
    }
    this.setState({
      loginData: loginData
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-login">
        <div className="canvasBox">
          <CanvasBack row={12} col={8} />
        </div>
        <div
          className="loginBox all_trans5 show">
         <Form>
            <div className="title">
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=329716688,175096001&fm=27&gp=0.jpg" alt="logo" />
              <span>评优评先管理系统</span>
            </div>
            <div>
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
                    onChange = { (e) => this.handleChangeLogin(e, "account") }
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "请输入密码" },
                    { max: 18, message: "最大长度18个字符" }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    size="large"
                    type="password"
                    placeholder="请输入密码"
                    onPressEnter={() => this.onSubmit()}
                    onChange = { (e) => this.handleChangeLogin(e, "password") }
                  />
                )}
              </FormItem>
              <div style={{ lineHeight: "40px" }}>
                <Checkbox
                  className="remember"
                  checked={this.state.rememberPassword}
                  onChange={e => this.onRemember(e)}
                >
                  记住密码
                </Checkbox>
                <Button
                  className="submit-btn"
                  size="large"
                  type="primary"
                  loading={this.state.loading}
                  onClick={() => this.onSubmit()}
                >
                  {this.state.loading ? "请稍后" : "登录"}
                </Button>
              </div>
            </div>
        </Form>
        </div>
      </div>
    );
  }
}
export default Form.create()(Login)