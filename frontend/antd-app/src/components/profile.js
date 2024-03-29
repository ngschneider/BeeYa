
import { Statistic, Row, Col, Button, Popover, Menu, Layout, message, Popconfirm} from 'antd';
import {BrowserRouter} from 'react-router-dom';
import {HomeOutlined, SettingFilled, UserOutlined, LogoutOutlined, CompassOutlined} from '@ant-design/icons';
import React, { Component } from 'react';

import {getFollowers,getFollowing,getPosts, getUsername} from '../Fetching/ProfileREST'

import Tweet from './Tweet';
const {Sider, Content} = Layout;
export default class Profile extends Component {

    constructor(){
        super();
        this.state = {
            username:"",
            userid:-1,
            followerCount:0,
            followingCount:0,
            followers: [],
            following: [],
            myPosts:[]
        };

    }
    //Change to Correct userID
    componentDidMount(){
        this.setState({
            username:this.props.location.state.username,
            userid:this.props.location.state.userid
        });
        this.followerFetch(this.props.location.state.userid);
        this.followingFetch(this.props.location.state.userid);
        this.myPostFetch(this.props.location.state.userid);
    }

    followerFetch = (userid) => {

        let input = {
            id : userid
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

    followingFetch = (userid) => {
        let input = {
            id : userid
        }

        getFollowing(input, (response) =>{
            if(response.following) {
                this.setState({
                    following: response.following,
                    followingCount: response.following.length
                })
            }
        })
    }
    myPostFetch = (userid) => {

        let input = {
            id : userid
        }

        getPosts(input, (response) => {
            console.log(response)
            this.setState({
                myPosts:response
            });

        });
        
    }

    sortMyPosts = () =>{
        const myPostsSorted = [].concat(this.state.myPosts)
        .sort((a, b) => a.created_at < b.created_at ? 1 : -1)
        this.state.myPosts = [].concat(myPostsSorted)
    }

    createContentFollowing = ()  => {
        const content =  (
        <div>
            {this.state.following.map( (element, index) => {
                console.log(element.created_at);

               return   <p key={index}> { "User " + element.followedUser + ", since " + element.created_at} </p>
            })}
        </div>
        )
        console.log(content)
        return content;
    }
    
    
    createContentFollowers = ()  => {
        const content =  (
        <div>
            {this.state.followers.map( (element, index) => {
                console.log(element.created_at);

               return   <p key={index}> { "User " + element.followingUser  + ", since " + element.created_at} </p>
            })}
        </div>
        )
        console.log(content)
        return content;
    } 
    createContentMyTweets = () => {
        this.sortMyPosts();
        const content =  
        <div>
            {this.state.myPosts.map( (element, index) => {
                if(element.in_reply_to_postid === null){
                    return (
                    <div className="profilePost">

                        <Tweet postText={element.posttext} likes={element.likes_count} img={element.img_id} rebuzz={element.rebuzz_count}/>
                    </div>)
                }else{

                }
            })}
        </div>
        
     //   console.log(content)
        return content;
    }

    handleHomeClick = () => {
        this.props.history.push({
            pathname:"/Home",
            state:{
                username:this.state.username
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


    handleSettingsClick = () =>{
        this.props.history.push("/Setting");
        this.props.history.push({
            pathname:"/Setting",
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

    render() {
        const followers = this.createContentFollowers();
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
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']} style={{width:"400px", minWidth:"400px"}}>
                            <Menu.Item key="1" icon={<HomeOutlined />} 
                            onClick={this.handleHomeClick}>
                                Home
                            </Menu.Item>
                            <Menu.Item key="2" icon={<CompassOutlined />} 
                            onClick={this.handleExploreClick}>
                                Explore
                            </Menu.Item>
                            <Menu.Item key="3" icon={<UserOutlined />}>
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

                <Content>
                    <div className="profile_page_center">
                        <div className="profile_header">
                                
                            {/*Swap "CurrentUsername" for reactive currentUser*/}
                            <div className="profile_header_username">{this.state.username + "'s profile" }</div>
                            <br/>
                           
                            
                            <center>
                            {"Followers : "}
                            <Popover placement="bottom" title={"Following"} content={followers} trigger="click">
                                <Button type="FollowerCount" size={'large'}>
                                    {this.state.followerCount}
                                </Button>
                            </Popover>

                            {"Following : "}
                            <Popover placement="bottom" title={"Following"} content={following} trigger="click">
                                <Button type="FollowerCount" size={'large'}>
                                    {this.state.followingCount}
                                </Button>
                            </Popover>

                            {"Buzzes:"}
                            <Button type="FollowerCount" size={'large'}>
                                {this.state.myPosts.length}
                            </Button>
                            {/*{"Settings:"}
                            <Popover placement="bottom" title={"Following"} content={following} trigger="click">
                                <Button type="FollowerCount" size={'large'}>
                                    {"TODO"}
                                </Button>
                </Popover>*/}
                            </center>

                            <div className="profile_MyTweets_Header"> {"My Tweets"}  </div>
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
