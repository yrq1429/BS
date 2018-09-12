import React, { Component } from 'react';
import './userInner.css';

class UserInner extends Component {
  render () {
    return (
      <div className="user">
        <div className="user-avatar">
          <a href="#">
            <img src="//misc.360buyimg.com/mtd/pc/common/img/no_login.jpg" alt=""/>
          </a>
        </div>
        <div className="user-show">
          <p>Hi~ 欢迎来到京东</p>
          <p>
            <a href="#">登录&nbsp;</a>
            <a href="#">注册</a>
          </p>
        </div>
        <div className="user-profit">
          <a href="#" className="user-button1">新人福利</a>
          <a href="#" className="user-button2">PLUS会员</a>
        </div>
      </div>
    )
  }
}

export default UserInner;