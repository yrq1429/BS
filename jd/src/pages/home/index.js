import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout, message, Breadcrumb } from "antd";
import './index.scss'
import Header from "../../a_component/Header";
import Menu from "../../a_component/Menu";
import Footer from "../../a_component/Footer";
import Loading from "../../a_component/Loading";
import tools from "../../util/tools";
import Loadable from "react-loadable";
import menuData from '../menu-data.json';
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
class Home extends Component {
  constructor (props) {
    super (props);
    this.state = {
      collapsed: false,
      menus: menuData.menu,
      // menus: menuData.rootMenu,      
      location: "",
      userInfo: { username:"121212" }
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

  render() {
    return (
      <Layout className="page-basic">
        <Menu
          data={this.state.menus}
          collapsed={this.state.collapsed}
          location={this.state.location}
          userInfo = { this.props.location.query }
        />
        <Layout>
          <Header
            collapsed={this.state.collapsed}
            data = { this.state.userInfo }
          />
          <div className="menus">
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Content className="content">
            <div className="page-home">
              <div className="box">
                <div className="title">
                  学校概况
                </div>
                <div className="info">
                  &nbsp;&nbsp;&nbsp;&nbsp;学生评奖评优管理系统是为了适应新形式下学生奖学金评定工作而准备开发的一套管理系统。要求能够实现学生德智体综合信息库的自动导入,按照公式自动进行德智体综合排名,根据比例要求自动生成获得奖学金学生信息、能够查询、修改各种信息,对排名、获奖学金信息进行统计,生成报表,基本满足学生工作人员的需要。
                </div>
                <div className="info">
                  &nbsp;&nbsp;&nbsp;&nbsp;本系统是根据具体情况和要求而开发的一套完善的学生评奖评优管理系统。其目的在于为教务工作有关部门提供优质、高效的业务管理和事务处理的同时,采用安全可靠的处理和控制技术,及时、准确、可靠地采集和传输信息,建立完备、可靠的处理机制,提高工作效率,减少出错率。
                </div>
                <div className="info">
                  &nbsp;&nbsp;&nbsp;&nbsp;本人负责的学生评奖评优管理系统,是由学生和管理员两部分组成。管理员主要是对学生信息数据库的导入和删除等操作与对奖学金评定相关信息的分类统计,以便能得出评定的结果。该系统运用MongoDB作为后台数据库,用node+react为开发工具。本文论述了系统从分析到实现的整个过程,说明系统实现的基本思路,介绍系统不同的功能模块以及实现的相关技术。
                </div>
              </div>
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default Home;
