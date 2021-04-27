import React, { Component } from 'react';
import { Image, Divider, Form, Input, Button, Layout, Menu, Row, Col,  Avatar, Popconfirm} from 'antd';
import {HomeOutlined, SettingFilled, UserOutlined, UploadOutlined, FileImageOutlined, LogoutOutlined, CompassOutlined} from '@ant-design/icons';
import { Upload, message} from 'antd';
import {BrowserRouter} from 'react-router-dom';
import {getFollowers,postTweet,getID, getFeed} from '../Fetching/HomeREST'
import {getPosts} from '../Fetching/ProfileREST'
import Tweet from './Tweet'

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
            userid:-1,
            feedPosts: []
        };
    }
    feedPostsFetch(uid){
        let input = {
            id:1
        }
        getFeed(input, (response) => {
            console.log(response);
            this.setState({
                feedPosts:response
            })
        });
    }
    sortMyPosts = () =>{
        const feedPostsSorted = [].concat(this.state.feedPosts)
        .sort((a, b) => a.created_at < b.created_at ? 1 : -1)
        this.state.feedPosts = [].concat(feedPostsSorted)
    }

    createContentFeedTweets = () => {
        this.sortMyPosts();
        const content =
            <div>
                {this.state.feedPosts.map( (element, index) => {
                    if(element.in_reply_to_postid === null){
                        return (
                        <div className="home_post">
                            <Tweet postText={element.posttext} likes={element.likes_count} img={element.img_id} rebuzz={element.rebuzz_count}/>
                        </div>)
                    }else{

                    }
                })}
            </div>
             //   console.log(content)
        return content;
       
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
       // this.props.history.push("/Profile");
        this.props.history.push({
            pathname:"/Profile",
            state:{
                username:this.state.username,
                userid:this.state.userid
            }
        });
    }

    handleSettingsClick = () =>{
     //   this.props.history.push("/Setting");
        this.props.history.push({
            pathname:"/Setting",
            state:{
                username:this.state.username,
                userid:this.state.userid
            }
        });
    }

    handleExploreClick = () =>{
            this.props.history.push({
                pathname:"/Explore",
                state:{
                    username:this.state.username,
                    userid: this.state.userid
                }
            });
    }


   

    logoutConfirm = (e) => {
        console.log(e);
        message.success('You have been logged out.');

        this.props.history.push({
            pathname:"/",
            state:{
                username:null,
                userid:null
            }
        });  
      }
      
      logoutCancel(e) {
        console.log(e);
        message.error('Log Out Cancelled');
      }


    componentDidMount(){
        this.setState({
            username:this.props.location.state.username
        });
        this.feedPostsFetch(1);
    }
    render() {
        const feed = this.createContentFeedTweets();
        return (
                <Layout>
                    <div className = "homeSider">
                    <Sider style={{
                        overflow: 'auto',
                        width: '200vw',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}>
                        {/*Sidebar Menu*/}
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{width:"200px", minWidth:"200px"}}>
                            <Menu.Item key="1" icon={<HomeOutlined />}>
                                Home
                            </Menu.Item>
                            <Menu.Item key="2" icon={<CompassOutlined />}
                            onClick={this.handleExploreClick}>
                                Explore
                            </Menu.Item>
                            <Menu.Item key="3" icon={<UserOutlined />}
                            onClick={this.handleProfileClick}>
                                Profile
                            </Menu.Item>
                            <Menu.Item key="4" icon={<SettingFilled/>}
                            onClick={this.handleSettingsClick}>
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
                    

                    <div className="centerFeed">
                    <Content style={{overflow: 'initial'}}>
                    <Row>
                        <Col span={12}>
                            <div className = "status">
                                
                                <h1>{this.state.username+"'s "} Home </h1>
                                <Divider style={{borderWidth: "1px", borderColor: "grey"}}></Divider>
                                <div className = "statusTextArea">
                                    <Form>
                                    <Row>
                                        <Col span={2}>
                                            
                                        </Col>
                                        <Col span={22}>
                                            <Form.Item>
                                            <TextArea showCount maxLength={140} onChange={this.onChange} 
                                                bordered={false} placeholder="What's all the buzz?" autoSize={{ minRows: 2, maxRows: 2 }} size="small"
                                                style={{marginLeft: '20px'}}/> 
                                            </Form.Item>
                                            <Divider style={{marginTop:"1px", marginBottom:"4px"}}></Divider>
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                    {/*Upload Image Button*/}
                                        <Col span={16} offset={2}>
                                            <Upload
                                            action={"http://localhost:444/img"}>
                                                <Button icon={<FileImageOutlined/>} style={{backgroundColor:"#1890ff", borderWidth:"0px", 
                                                borderRadius:"10px"}}></Button>
                                            </Upload>
                                        </Col>
                                        

                                        <Col span={6}>
                                            <Form.Item>
                                                <div className = "tweetButton">
                                                <Button type="primary" style={{borderRadius:"10px",
                                                marginLeft:"85px", borderWidth:"0px", fontWeight:"bold"}}
                                                onClick={() => this.tweet(this.state.userid,this.state.text)}
                                                > Buzz </Button>
                                                </div>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                   
                                    
                                    </Form>
                                </div>
                                

                            </div>
                        </Col>
                    </Row>
                    
                    <Row>
                            <Col span={24}>
                                {feed}
                            </Col>
                    </Row>  
                    </Content>
                    </div>
                </Layout>
        )
    }
}
