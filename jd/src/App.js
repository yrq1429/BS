import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import { GlobalStyle } from "./style";
import Home from "./pages/home";
import Login from "./pages/login";

class App extends Component {
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

export default App;
