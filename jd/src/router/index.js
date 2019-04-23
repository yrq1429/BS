/** 根路由 **/
import React, { Fragment } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// import tools from "../util/tools";
import Home from "../pages/home";
import Login from "../pages/login";

class RootContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <Router>
         <Fragment>
           <Route exact path='/' component={ Home }></Route>
           <Route exact path='/home' component={ Home }></Route>           
           <Route exact path='/login' component={ Login }></Route>                        
         </Fragment>
     </Router>
    );
  }
}

export default RootContainer