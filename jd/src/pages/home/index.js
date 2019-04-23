import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout, message } from "antd";
import Header from "../../a_component/Header";
import Menu from "../../a_component/Menu";
import Footer from "../../a_component/Footer";
import Bread from "../../a_component/Bread";
import Loading from "../../a_component/Loading";
import tools from "../../util/tools";
import Loadable from "react-loadable";

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
      menus: [
        {
          id: 1,
          title: "首页",
          icon: "home",
          url: "/home",
          parent: null,
          desc: "首页",
          sorts: 0,
          conditions: 1
        },
        {
          id: 2,
          title: "系统管理",
          icon: "setting",
          url: "/system",
          parent: null,
          desc: "系统管理目录分支",
          sorts: 1,
          conditions: 1
        },
        {
          id: 3,
          title: "用户管理",
          icon: "user",
          url: "/useradmin",
          parent: 2,
          desc: "系统管理/用户管理",
          sorts: 0,
          conditions: 1
        },
        {
          id: 4,
          title: "角色管理",
          icon: "team",
          url: "/roleadmin",
          parent: 2,
          desc: "系统管理/角色管理",
          sorts: 1,
          conditions: 1
        },
        {
          id: 5,
          title: "权限管理",
          icon: "coffee",
          url: "/poweradmin",
          parent: 2,
          desc: "系统管理/权限管理",
          sorts: 2,
          conditions: 1
        },
        {
          id: 6,
          title: "菜单管理",
          icon: "appstore",
          url: "/menuadmin",
          parent: 2,
          desc: "系统管理/菜单管理",
          sorts: 3,
          conditions: 1
        }
      ],
      location: ""
      
    }
  }

  render() {
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
            // userinfo={this.props.userinfo}
            // onToggle={this.onToggle}
            // onLogout={this.onLogout}
            // getNews={this.getNews}
            // clearNews={this.clearNews}
            // newsData={this.state.newsData}
            // newsTotal={this.state.newsTotal}
            // popLoading={this.state.popLoading}
            // clearLoading={this.state.clearLoading}
          />
          {/* <Bread menus={this.props.menus} location={this.props.location} /> */}
          {/* <Content className="content"> */}
            {/* <Switch>
              <Redirect exact from="/" to="/home" />
              <Route
                exact
                path="/home"
                render={props => this.onEnter(Home, props)}
              />

              <Route
                exact
                path="/system/menuadmin"
                render={props => this.onEnter(MenuAdmin, props)}
              />
              <Route
                exact
                path="/system/poweradmin"
                render={props => this.onEnter(PowerAdmin, props)}
              />
              <Route
                exact
                path="/system/roleadmin"
                render={props => this.onEnter(RoleAdmin, props)}
              />
              <Route
                exact
                path="/system/useradmin"
                render={props => this.onEnter(UserAdmin, props)}
              />
              <Route exact path="/nopower" component={NotFound} />
              <Route component={NotFound} />
            </Switch> */}
          {/* </Content> */}
          {/* <Footer /> */}
        </Layout>
      </Layout>
    );
  }
}

export default Home;
