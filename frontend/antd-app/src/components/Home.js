import React, { Component } from 'react';
import { Image, Divider, Form, Input, Button, Layout, Menu, Row, Col} from 'antd';
import {HomeOutlined, SettingFilled, UserOutlined} from '@ant-design/icons';
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
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        paddingInline: '0px 0px 100px 0px'
                    }}>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
                    <Content style={{overflow: 'initial', margin:'0px 200px'}}>
                    <Row>
                        <Col span={18}>
                            <div className = "status">
                                <Divider></Divider>
                                <TextArea showCount maxLength={140} onChange={onChange} 
                                bordered={false} placeholder="What's all the buzz?" autoSize={{ minRows: 2, maxRows: 6 }}/>
                            </div>
                        </Col>
                    </Row>


                    </Content>
                </Layout>
        )
    }
}
