import React from 'react';
import { Button, Switch } from 'antd';
import './App.css';
import AppHeader from './components/landing';
import {Layout} from 'antd';
import { BrowserRouter, Route } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;

export default function App() {
    return (
        <AppHeader/>
    )
 }
