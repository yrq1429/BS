import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import { GlobalStyle } from "./style";
import Home from "./pages/home";
import Login from "./pages/login";
import StudentSearch from './pages/studentsearch'
import AddScore from './pages/addscore'
import ChangePassword from './pages/changepassword';
import AwardSetting from './pages/awardsetting';
class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path='/' component={ Home }></Route>
          <Route exact path='/home' component={ Home }></Route>           
          <Route exact path='/login' component={ Login }></Route> 
          <Route exact path='/system/studentsearch' component={ StudentSearch }></Route>                                                         
          <Route exact path='/system/add' component={ AddScore }></Route>   
          <Route exact path='/system/changepassword' component={ ChangePassword }></Route> 
          <Route exact path='/system/awardsetting' component={ AwardSetting }></Route>                                                                                                                         
                                                                                                                                  
        </Fragment>
      </Router>
    );
  }
}

export default App;
