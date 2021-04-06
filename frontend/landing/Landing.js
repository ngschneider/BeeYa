import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mountNode from 'react';
import { Layout, Button, Row, Col, Card, Form, Input, Divider} from 'antd';
import "./Landing.less";
import { Typography } from 'antd';
import {axios} from 'axios';
const { Title } = Typography;
const { Header, Footer, Sider, Content} = Layout;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };


export default class Landing extends Component {
    constructor(props) {
        super(props);
    
    this.state = {
        username: "",
        displayname: "",
        email: "",
        password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

}
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        console.log("Submitted");
        
        axios.post('ec2-18-216-224-141.us-east-2.compute.amazonaws.com:444/CreateUser', {
            username: this.username,
            displayname: this.displayname,
            email: this.email,
            password: this.password
        });
        event.preventDefault();
    }
    
    render() {
        return (
            <>
            <div classname = "Landing">
                <Layout>
                <Row type="flex" align-items="center" justify="center" align="middle">
                    <Col span={2}>
                         <Title >BeeYa</Title>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 5, offset: 2 }}>
                        <Title level={2}>Bee yourself.</Title>
                     </Col>
                </Row>
        
                <Row>
      <Card style={{width:700}}>
      <Col span={11}>
        <Title level = {3}>REGISTER</Title>
        <Form {...layout}name="basic">
            <Form.Item
            label="Username"
            name="username"
            rules={[
            {
                required: true,
                message: 'Please input your username!',
            },
            ]}>
                <input
                    value={this.state.username}
                    onchange={this.handleChange}
                />
            </Form.Item> 
            
            <br />
            <Form.Item
            label="Display Name"
            name="DisplayName"
            rules={[
            {
                required: true,
                message: 'Please input your dispay name!',
            },
            ]}>
                <Input 
                    value={this.state.displayname}
                    onchange={this.handleChange}/>
            </Form.Item> 
            <br />
            <Form.Item
            label="Email"
            name="Email"
            rules={[
            {
                required: true,
                message: 'Please input your email!',
            },
            ]}>
                <Input 
                value={this.state.email}
                onchange={this.handleChange}/>
            </Form.Item> 
            <br />

            <Form.Item
            label="Password"
            name="Password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}>
                <Input type="password" 
                value={this.state.password}
                onchange={this.handleChange}/>
            </Form.Item> 
            <Row type="flex" justify="center" align="middle"> 
                    <Col>
                    <button type="submit" name="sign-up-btn">Sign Up</button>
                    </Col>
             </Row>
            </Form>
           
      </Col>
     
      </Card>
      <Col span={2}>
        <Divider type="vertical" style={{ height: "100%" }} />
      </Col>
    <Card style={{width:650}}>
      <Col span={11}>
        <Title level={3}>LOGIN</Title>
        <Form {...layout}
        name="basic">
            <Form.Item
            label="Username"
            name="username"
            rules={[
            {
                required: true,
                message: 'Please input your username!',
            },
            ]}>
                <Input 
                value={this.state.username}
                onchange={this.handleChange}/>
            </Form.Item> 
            <br />
            <Form.Item
            label="Password"
            name="Password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}>
                <Input 
                type="password"
                value={this.state.password}
                onchange={this.handlechange}/>
            </Form.Item> 
            <Row type="flex" justify="center" align="middle"> 
                <Col>
                    <button type="submit" name="login-btn">Login</button>
                </Col>
            </Row>
            </Form>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
      </Col>

      </Card>
    </Row>
                
                <br></br>
                    
    
                <Footer></Footer>
                </Layout>
              </div>
              </>
        )
    }
    
    
}


  