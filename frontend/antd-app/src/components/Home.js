import React, { Component } from 'react';
import { Image, Divider, Form, Input, Button, Layout, Menu, Row, Col,  Avatar} from 'antd';
import {HomeOutlined, SettingFilled, UserOutlined, UploadOutlined, FileImageOutlined} from '@ant-design/icons';
import { Upload, message} from 'antd';
import {BrowserRouter} from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;
const {TextArea} = Input;

//Track text area changes in console
const onChange = e => {
    console.log('Change:', e.target.value);
  };

export default class Home extends Component {

    
    render() {
        return (
                <Layout>
                    <div className = "homeSider">
                    <Sider style={{
                        overflow: 'auto',
                        width: '400vw',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}>
                        {/*Sidebar Menu*/}
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{width:"400px", minWidth:"400px"}}>
                            <Menu.Item key="1" icon={<HomeOutlined />}>
                                Home
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UserOutlined />}>
                                Profile
                            </Menu.Item>
                            <Menu.Item key="3" icon={<SettingFilled/>}>
                                Settings
                            </Menu.Item>
                            
                        </Menu>

                    </Sider>
                    </div>

                    <div className="centerFeed">
                    <Content style={{overflow: 'initial'}}>
                    <Row>
                        <Col span={12}>
                            <div className = "status">
                                <h1>Home</h1>
                                <Divider style={{borderWidth: "1px", borderColor: "grey"}}></Divider>
                                <div className = "statusTextArea">
                                    <Row>
                                        <Col span={2}>
                                        <Avatar style={{ backgroundColor: 'black', verticalAlign: 'middle', marginLeft: '4px'}} size="large"/>
                                        </Col>
                                        <Col span={22}>
                                        <TextArea showCount maxLength={140} onChange={onChange} 
                                    bordered={false} placeholder="What's all the buzz?" autoSize={{ minRows: 2, maxRows: 4 }}/> 
                                        </Col>
                                    </Row>
                                     
                                </div>
                
                                <div className = "statusButtons">
                                {/*Upload Image Button*/}
                                <Row>
                                    <Col span={12}>
                                        <Upload>
                                            <Button icon={<FileImageOutlined />}></Button>
                                        </Upload>
                                    </Col>
                                    <Col span={12}>
                                    <Button style={{backgroundColor:"yellow", borderRadius:"10px"}} > Buzz </Button>
                                    </Col>
                                </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    


                    </Content>
                    </div>
                </Layout>
        )
    }
}
