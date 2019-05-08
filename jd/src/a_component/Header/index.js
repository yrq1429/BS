/** 头部 **/
import React from "react";
import P from "prop-types";
import { Link } from "react-router-dom";
import { Layout, Icon, Tooltip, Menu, Dropdown } from "antd";

import "./index.scss";
const { Header } = Layout;
export default class Com extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false, // 当前是否是全屏状态
      userinfo:{}
    };
  }

  componentDidMount() {
    console.log(this.props.data);
    this.setState({
      userinfo: this.props.data
    }, () => {
      // console.log(this.state.userinfo.username)
    })
  }

  /** 点击左侧按钮时触发 **/
  toggle = () => {
    this.props.onToggle();
  };


  /**
   * 退出登录
   * **/
  onMenuClick = e => {
    if (e.key === "logout") {
      // 退出按钮被点击
      this.props.onLogout();
    }
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
                111
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
