import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route,Redirect,Switch } from "react-router-dom";
import { GlobalStyle } from "./style";
import Home from "./pages/home";
import Login from "./pages/login";
import StudentSearch from './pages/studentsearch'
import AddScore from './pages/addscore'
import ChangePassword from './pages/changepassword';
import AwardSetting from './pages/awardsetting';
import ManageStudent from './pages/managestudent';
import ManageAllStudent from './pages/manageallstudent';
import ManageTeacher from './pages/manageteacher';
import AddTeacher from './pages/addteacher';
import axios from 'axios';
class App extends Component {

  componentWillMount() {
   
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path='/' component={ Login }></Route>
          <Route exact path='/home' component={ Home }></Route>           
          <Route exact path='/login' component={ Login }></Route> 
          <Route exact path='/system/studentsearch' component={ StudentSearch }></Route>                                                         
          <Route exact path='/system/add' component={ AddScore }></Route>   
          <Route exact path='/system/changepassword' component={ ChangePassword }></Route> 
          <Route exact path='/system/awardsetting' component={ AwardSetting }></Route>   
          <Route exact path='/system/managestudent' component={ ManageStudent }></Route> 
          <Route exact path='/system/manageTeacher' component={ ManageTeacher }></Route>  
          <Route exact path='/system/addTeacher' component={ AddTeacher }></Route> 
          <Route exact path='/system/manageallstudent' component={ ManageAllStudent }></Route>                                                                                                                                                                                                                                                                                                                                     
        </Fragment>
      </Router>
    );
  }
}

export default App;
