
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

import './App.less';
import Landing from './Landing';

import {Route, BrowserRouter as Router} from 'react-router-dom';
import Post from './Post';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <div className="App">

      </div>
      <Route path ="/" exact component={Landing.js}/>
    </Router>
  );
}

export default App;
