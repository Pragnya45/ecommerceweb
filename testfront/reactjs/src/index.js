import React from 'react';
import ReactDOM from "react-dom";
import {Route,Link,Switch,BrowserRouter as Router} from "react-router-dom";
import './index.css';
import App from './App';
import User from './User'
import Visit from './Visit';
import notfound from './notfound';




const routing = (
  <Router>
    <Switch>
    <Route exact path ="/" component = {App} />
    <Route path ="/user" component = {User} />
    <Route path ="/visit" component = {Visit} />
    <Route component = {notfound} />
    </Switch>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));



