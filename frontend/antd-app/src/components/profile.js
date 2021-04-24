import { Statistic, Row, Col, Button, Popover, Menu, Layout} from 'antd';
import {BrowserRouter} from 'react-router-dom';
import {HomeOutlined, SettingFilled, UserOutlined, UploadOutlined, FileImageOutlined} from '@ant-design/icons';
import React, { Component } from 'react';

import {getFollowers,getPosts} from '../Fetching/ProfileREST'


import Tweet from './Tweet';
const {Sider, Content} = Layout;
export default class Profile extends Component {

    constructor(){
        super();
        this.state = {
            followerCount:0,
            followingCount:0,
            followers: [],
            myPosts:[]
        };

    }
    //Change to Correct userID
    componentDidMount(){
        this.followerFetch(1);
        this.myPostFetch(1);
    }

    followerFetch = (userId) => {

        let input = {
            id : userId
        }

        getFollowers(input, (response) => {
            if(response.followers){
                this.setState({
                    followers:response.followers,
                    followerCount: response.followers.length
                });
            }else {
                console.log("User has no followers, or failed to connect to server")
            }
        });
        
    }

    myPostFetch = (userId) => {

        let input = {
            id : userId
        }

        getPosts(input, (response) => {
            console.log(response)
            this.setState({
                myPosts:response
            });

        });
        
    }
    createContentFollowing = ()  => {
        const content =  (
        <div>
            {this.state.followers.map( (element, index) => {
                console.log(element.created_at);
               return   <p key={index}> {  element.followedUser + ", since " + element.created_at} </p>
            })}
        </div>
        )
        console.log(content)
        return content;
    } 
    createContentMyTweets = ()  => {
        const content =  
        <div>
            {this.state.myPosts.map( (element, index) => {
                if(element.in_reply_to_postid === null){
                    return (
                    <div className="profilePost">
                        <Tweet postText={element.posttext} likes={element.likes_count} rebuzz={element.rebuzz_count}/>
                    </div>)
                }else{

                }
            })}
        </div>
        
     //   console.log(content)
        return content;
    }

    handleHomeClick = () => {
        this.props.history.push("/Home");
    }
    render(){
        
        const following = this.createContentFollowing();

        const myTweets = this.createContentMyTweets();

        return (

            <div>
            <Layout>
                <div className = "homeSider">
                    <Sider style={{
                        overflow: 'auto',
                        width: '400px',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}>
                        {/*Sidebar Menu*/}
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} style={{width:"400px", minWidth:"400px"}}>
                            <Menu.Item key="1" icon={<HomeOutlined />} 
                            onClick={this.handleHomeClick}>
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

                <Content>
                    <div className="profile_page_center">
                        <div className="profile_header">
                                
                            {/*Swap "CurrentUsername" for reactive currentUser*/}
                            <div className="profile_header_username">{"CurrentUsername"}</div>
                            <br/>
                            <div className="profile_header_buzzes">{this.state.myPosts.length + " buzzes"}</div>
                            
                            <center>
                            {"Following : "}
                            <Popover placement="bottom" title={"Following"} content={following} trigger="click">
                                <Button type="FollowerCount" size={'large'}>
                                    {this.state.followerCount}
                                </Button>
                            </Popover>

                            {"Followers : "}
                            <Popover placement="bottom" title={"Following"} content={following} trigger="click">
                                <Button type="FollowerCount" size={'large'}>
                                    {"TODO"}
                                </Button>
                            </Popover>

                            {"Tweets:"}
                            <Popover placement="bottom" title={"Following"} content={following} trigger="click">
                                <Button type="FollowerCount" size={'large'}>
                                    {"TODO"}
                                </Button>
                            </Popover>
                            {"Settings:"}
                            <Popover placement="bottom" title={"Following"} content={following} trigger="click">
                                <Button type="FollowerCount" size={'large'}>
                                    {"TODO"}
                                </Button>
                            </Popover>
                            </center>

                            <div className="profile_MyTweets_Header">{"My Tweets"}
                            </div>
                        </div>
                        <br/>

                        <Row>
                            <Col span={24}>
                                {myTweets}
                            </Col>
                        </Row>  
                    </div>
                </Content>
            </Layout>  
            </div>
            );
    }

}
