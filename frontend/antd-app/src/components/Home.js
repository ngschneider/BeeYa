import React, { Component } from 'react';
import { Image, Divider, Form, Input, Button, Layout, Menu, Row, Col,  Avatar} from 'antd';
import {HomeOutlined, SettingFilled, UserOutlined, UploadOutlined, FileImageOutlined} from '@ant-design/icons';
import { Upload, message} from 'antd';
import {BrowserRouter} from 'react-router-dom';
import {getFollowers,postTweet,getID} from '../Fetching/HomeREST'
import {getPosts} from '../Fetching/ProfileREST'

const { Header, Footer, Sider, Content } = Layout;
const {TextArea} = Input;

//Track text area changes in console
const onChange = e => {
    console.log('Change:', e.target.value);
  };

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            text: '',
            username: "",
            userid:-1
        };
    }
    feedPostsFetch(uid){
        let input = {
            id:uid
        }
        getPosts(input, (response) => {
            console.log(response);
        });
    }
    
    getUserId(usrname){
        let input = {
            username:usrname
        }
        getID(input, (response) => {
            this.setState({
                userid:response.id
            });
        })

        }
    

    onChange = ({ target: { value } }) => {
        console.log(value)
        this.setState({
             text:value
             });
      }
        
    tweet(uid, postText){
        let input = {
            id:uid,
            text:postText
        }
        postTweet(input, (response) => {
            console.log(response);
       });
    }


    loadPosts = (id) => {
       this.feedPostsFetch(1);
      
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
    componentDidMount(){
        this.getUserId(this.props.location.state.username);
        this.setState({
            username:this.props.location.state.username
        });
    }
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
                            <Menu.Item key="2" icon={<UserOutlined />}
                            onClick={this.handleProfileClick}>
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
                                <h1>{this.state.username+"'s "} Home </h1>
                                <Divider style={{borderWidth: "1px", borderColor: "grey"}}></Divider>
                                <div className = "statusTextArea">
                                    <Row>
                                        <Col span={2}>
                                            <Avatar style={{ backgroundColor: 'black', verticalAlign: 'middle', marginLeft: '4px'}} size="large"/>
                                        </Col>
                                        <Col span={22}>
                                            <TextArea showCount maxLength={140} onChange={this.onChange} 
                                                bordered={false} placeholder="What's all the buzz?" autoSize={{ minRows: 2, maxRows: 2 }} size="small"
                                                style={{marginLeft: '20px'}}/> 
                                        </Col>
                                    </Row>
                                     
                                </div>
                                <div className = "statusButtons">
                                {/*Upload Image Button*/}
                                <Row>
                                    <Col span={12}>
                                        <Upload>
                                            <Button icon={<FileImageOutlined />} style={{backgroundColor:"yellow"}}></Button>
                                        </Upload>
                                    </Col>
                                    <Col span={12}>
                                    <Button style={{backgroundColor:"yellow", borderRadius:"10px"}}
                                    onClick={() => this.tweet(this.state.userid,this.state.text)}
                                     > Buzz </Button>
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
