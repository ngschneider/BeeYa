import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Landing from './components/landing';
import Home from './components/Home';
import { createBrowserHistory } from "history";
import Profile from './components/profile';
import Setting from './components/Setting';
import Explore from './components/Explore';

export const appHistory = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={appHistory}>
    <Switch>
      <Route exact path="/" component={ Landing }/>
      <Route exact path="/Home" component={Home}/>
      <Route exact path="/Explore" component={Explore}/>
      <Route exact path="/Profile" component={Profile}/>
      <Route exact path="/Setting" component={Setting}/>
    </Switch>
  </BrowserRouter>,
  
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
