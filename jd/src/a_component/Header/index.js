/** 头部 **/
import React from "react";
import P from "prop-types";
import { Link } from "react-router-dom";
import { Layout, Icon, Tooltip, Menu, Dropdown } from "antd";
import { BrowserRouter as Router, Route,Redirect,Switch } from "react-router-dom";
import {createHashHistory} from 'history';
import "./index.scss";
import axios from "axios";
import qs from 'qs';
const { Header } = Layout;
export default class Com extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false, // 当前是否是全屏状态
      userinfo:{},
      username: ""
    };
  }

  componentDidMount() {
    // console.log(this.props.data);
    // this.setState({
    //   userinfo: this.props.data
    // }, () => {
    //   // console.log(this.state.userinfo.username)
      this.getName();
    // })
  }

  getName = () => {
    var account = this.getCookie('account');
    axios.post('/getname', qs.stringify({
      "account":account
    }))
      .then( res => {
        console.log(res.data.data.username);
        this.setState({
          username: res.data.data.username
        })
      })
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

  /** 点击左侧按钮时触发 **/
  toggle = () => {
    this.props.onToggle();
  };
  delAllCookie = () =>{    
    var myDate=new Date();    
    myDate.setTime(-1000);//设置时间    
    var data=document.cookie;    
    var dataArray=data.split("; ");    
    for(var i=0;i<dataArray.length;i++){    
         var varName=dataArray[i].split("=");    
         document.cookie=varName[0]+"=''; expires="+myDate.toGMTString();    
    }    
                  
  }   

  /**
   * 退出登录
   * **/
  onMenuClick = e => {
    this.delAllCookie()
    console.log("aaa");
    this.props.handleOut();
  };

  render() {
    const u = true;
    return (
      <Header className="headerTop">
          <Icon
            className={
              // this.props.collapsed
              false
                ? "trigger flex-none"
                : "trigger flex-none fold"
            }
            type={"menu-unfold"}
          />
        <div className="rightBox flex-auto flex-row flex-je flex-ac">
            <div className="full">
              <Icon
                className="icon flex-none"
                type={this.state.fullScreen ? "shrink" : "arrows-alt"}
                onClick={
                  this.state.fullScreen
                    ? this.exitFullScreen
                    : this.requestFullScreen
                }
              />
            </div>
          {u ? (
            <Dropdown
              overlay={
                <Menu
                  className="menu"
                  selectedKeys={[]}
                  onClick={this.onMenuClick}
                >
                  <Menu.Item key="logout">
                    <Icon type="logout" />
                    退出登录
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
            >
              <div className="userhead flex-row flex-ac">
                <Icon type="smile-o" />
                <span className="username">
                {/* { this.state.userinfo.username } */}
                { this.state.username }
                </span>
              </div>
            </Dropdown>
          ) : (
            <Tooltip placement="bottom" title="点击登录">
              <div className="full">
                <Link to="/user/login">未登录</Link>
              </div>
            </Tooltip>
          )}
        </div>
      </Header>
    );
  }
}

Com.propTypes = {
  onToggle: P.func, // 菜单收起与展开状态切换
  collapsed: P.bool, // 菜单的状态
  onLogout: P.func, // 退出登录
  userinfo: P.object, // 用户信息
  popLoading: P.bool // 消息弹窗是否正在加载数据
};
