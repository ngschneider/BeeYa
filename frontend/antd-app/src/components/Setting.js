import  React, {Component} from "react";

import { Image, Divider, Form, Input, Button, Layout, Menu, Row, Col,  Avatar, Popconfirm, message} from 'antd';
import {HomeOutlined, SettingFilled, UserOutlined, UploadOutlined, FileImageOutlined, LogoutOutlined, CompassOutlined} from '@ant-design/icons';


const {Content, Sider} = Layout;
export default class Setting extends Component{

    constructor(){
        super();
        this.state = {
            username:"",
            userId:-1
        };
    }
    handleHomeClick = () => {
      //  this.props.history.push("/Setting");
        this.props.history.push({
            pathname:"/Home",
            state:{
                username:this.state.username,
                userid:this.state.userid
            }
        });
    }

    handleProfileClick = () =>{
        this.props.history.push("/Profile");
        this.props.history.push({
            pathname:"/Profile",
            state:{
                username:this.state.username,
                userid:this.state.userid
            }
        });
    }

    logoutConfirm = (e) => {
        console.log(e);
        message.success('You have been logged out.');

        this.props.history.push({
            pathname:"/"
        });
      }
      
      logoutCancel(e) {
        console.log(e);
        message.error('Log Out Cancelled');
      }

    componentDidMount(){
        this.setState({
            username:this.props.location.state.username,
            userId:this.props.location.state.userid
        });
    }

    render(){
        return (
            <div>
            <Layout>
                <div className="homeSider">
                <Sider style={{
                    overflow: 'auto',
                    width: '200vw',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}>
                    {/*Sidebar Menu*/}
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} style={{width:"200px", minWidth:"200px"}}>
                        <Menu.Item key="1" icon={<HomeOutlined />}
                        onClick={this.handleHomeClick}>
                            Home
                        </Menu.Item>
                        <Menu.Item key="2" icon={<CompassOutlined />}>
                            Explore
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UserOutlined />}
                        onClick={this.handleProfileClick}>
                            Profile
                        </Menu.Item>
                        <Menu.Item key="4" icon={<SettingFilled/>}>
                            Settings
                        </Menu.Item>
                        {/*Log Out PopConfirm*/}
                        <Menu.Item key="5" icon={<LogoutOutlined/>}>
                                <Popconfirm
                                        title="Are you sure you would like to log out?"
                                        onConfirm={this.logoutConfirm}
                                        onCancel={this.logoutCancel}
                                        okText="Log Out"
                                        cancelText="Cancel"
                                    >
                                        <a href="#">Log Out</a>
                                </Popconfirm>
                        </Menu.Item>
                        
                    </Menu>
                </Sider>
                </div>

                <Content>

                </Content>
            </Layout>
        </div>
        )


    }

}