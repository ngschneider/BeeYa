import React from 'react';
import ReactDOM from 'react-dom';
import {Layout} from 'antd';
import { Image, Divider, Form, Input, Button } from 'antd';
import {Row, Col} from 'antd';


const { Header, Footer, Sider, Content } = Layout;
const layout = {
    labelCol: { xs:{ span: 24}, sm:{span: 8}},
    wrapperCol: { xs: {span: 24}, sm:{span: 16} },
  };
  const tailLayout = {
    wrapperCol: { span:24 },
  };


export default class Landing extends React.Component {

    render() {
        return (
            <Layout classname="Landing">
            {/*background img*/}
            <Content>
            <div name="Content">
                <div className="Background" class="landingBackground" >
                    <Image
                        src="https://images.pexels.com/photos/1322185/pexels-photo-1322185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        preview = {false}
                        background = {"green"}
                />
                </div>
                {/*main text*/}
                <div className="block">
                    <div className="container-fluid">
                        <div className="landingTitle">
                            <h1>BeeYa</h1>
                            <h2>Bee Yourself.</h2>
                        </div>
                    </div>
                </div>
                
                {/*Login Box*/}
                <div className="login-form">



                <Form
                    
                    name="basic"
                    initialValues={{ remember: true }}
                    style={{margin: "10px 10px 10px"}}
                >
                <Row 
                     >
                    <Col span={24}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            style={{width: "345px"}}
                            wrapperCol={{span:24}}
                        >
                            <Input
                                size="large" placeholder="username" style={{borderRadius: "5px"}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            style={{width: "345px"}}
                            wrapperCol={{span:24}}
                        >
                            <Input.Password size="large" placeholder="password" style={{borderRadius: "5px"}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" size={'large'} style={{paddingInline:"150px"}}>Log In </Button>
                </Form.Item>
                </Form>
                </div>
            </div>

                


            </Content>
            <div class = "footer">
                <Footer style={{textAlign: 'right', 
                            position: 'fixed',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            background: 'gold'
                                }}>©2021 BeeYa, Inc.</Footer>
            </div>
            </Layout>
        )
    }

}