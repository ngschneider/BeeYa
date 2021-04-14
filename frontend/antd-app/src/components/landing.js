import React from 'react';
import ReactDOM from 'react-dom';
import {Layout} from 'antd';
import { Image, Divider, Form, Input, Button } from 'antd';
import {Row, Col} from 'antd';
import {login} from '../Fetching/LandingREST';
import Modal from 'antd/lib/modal/Modal';

const { Header, Footer, Sider, Content } = Layout;
const layout = {
    labelCol: { xs:{ span: 24}, sm:{span: 8}},
    wrapperCol: { xs: {span: 24}, sm:{span: 16} },
  };
  const tailLayout = {
    wrapperCol: { span:24 },
  };


      

export default class Landing extends React.Component {
    state = {visible: false}

    validatePassword= (rule, value, cb) => {

    }

    loginFetch(username, password){
        let input = {
            username:username,
            password:password
        }
        login(input, (response) => {
            console.log(response)
        });
    }

    handleSubmit = (values) => {
        const user = values.username;
        const pass = values.password;
        console.log(user);
        console.log(pass);
        this.loginFetch(values.username, values.password);
    }

    /*Unfinished*/
    handleCreateAccountSubmit = (values) => {
        const user = values.username;
        const pass = values.password;
        const email = values.email;
        const disp = values.displayname;


    }   

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    
    handleOk = e => {
        this.setState({
            visible: false,
        });
    };
    
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
 

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
                    onFinish={(values) => this.handleSubmit(values)}
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
                <div style={{width: "300px", marginLeft:"30px", textAlign:"center"}}>
                    <Divider style={{borderColor: "black", borderWidth:"0.5px"}} plain="false">OR</Divider>
                </div>
                
                {/*Create New Account Button opens Modal*/}
                <Button type="primary" htmlType="button" size={"large"} 
                style={{paddingInline:"50px", backgroundColor:"rebeccapurple", borderColor:"rebeccapurple"}}
                wrapperCol={{span:24}}
                onClick={this.showModal}>Create New Account </Button>

                <Modal title="Create New Account" visible={this.state.visible} 
                onOk={this.handleOk} onCancel={this.handleCancel}
                footer={null}
                closable="true"
                style={{alignItems:"center"}}>
                <Form
                    
                    name="basic"
                    initialValues={{ remember: true }}
                    style={{margin: "10px 10px 10px"}}
                    onFinish={(values) => this.handleCreateAccountSubmit(values)}
                >
                    <Row >
                        <Col span={11}>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                                wrapperCol={{span:24}}
                                margin={"2px 2px 2px 2px"}
                            >
                                <Input
                                    addonBefore={"@"} size="large" placeholder="Username" maxLength={15}
                                    style={{borderRadius: "5px"}}/>
                            </Form.Item>
                        </Col>
                        <Col span={13}>
                            <Form.Item
                                name="display name"
                                rules={[{ required: true, message: 'Please your display name!' }]}
                                wrapperCol={{span:24, offset: 2}}
                                
                            >
                                <Input
                                    size="large" placeholder="Display Name" maxLength={25}
                                    style={{borderRadius: "5px"}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <Form.Item
                                name="Email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                                wrapperCol={{span:24}}
                            >
                                <Input
                                    size="large" placeholder="Email" style={{borderRadius: "5px"}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <Form.Item
                                name="Password"
                                rules={[{ required: true, message: 'Please input your password!' },
                                        { validator: this.validatePassword}]}
                                wrapperCol={{span:24}}
                                
                            >
                                <Input
                                    size="large" placeholder="Password" style={{borderRadius: "5px"}} type="password"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                    <Button type="primary" htmlType="submit" size={'large'} 
                    style={{paddingInline:"200px", backgroundColor:"green", borderColor:"green", height:"50px"}}>Sign Up</Button>
                    </Form.Item>
                </Form>
                </Modal>
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