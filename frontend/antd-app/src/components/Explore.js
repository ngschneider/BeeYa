import React, { Component } from 'react'
import { Divider, Row, Col, Button, Popover, Menu, Layout, message, Popconfirm, Input, Tabs} from 'antd'
import {BrowserRouter} from 'react-router-dom'
import {HomeOutlined, SettingFilled, UserOutlined, LogoutOutlined, CompassOutlined, ThunderboltOutlined} from '@ant-design/icons'
import Tweet from './Tweet'

import {getFollowers,getPosts} from '../Fetching/ProfileREST'
import {getExplorePosts, getSearchPosts} from '../Fetching/ExploreREST'
const {Sider, Content} = Layout;
const { Search } = Input;

const searchFailPost = () =>{
    return (
    <div className="explore_post">
        <p>Search Returned No Results!</p>
    </div>);
}
export default class Explore extends Component {
    constructor(){
        super();
        this.state = {
            username:"",
            userid:-1,
            explorePosts:[],
            headerText:""
        };
    }

    componentDidMount(){
        this.setState({
            username:this.props.location.state.username,
            userid:this.props.location.state.userid
        });
        this.explorePostsFetch(this.props.location.state.userid);
    }

    explorePostsFetch = (userid) => {

        let input = {
            user_id : userid
        }

        getExplorePosts(input, (response) => {
            console.log(response)
            this.setState({
                explorePosts:response
            });

        });
        
    }

    searchPostsFetch = (query) =>{
        let input ={
            posttext: query
        }



        getSearchPosts(input, (response) => {
            console.log(response)
            if(response.error){
                message.error('Search returned no posts');
            }
            else {
                this.setState({
                    explorePosts:response
                });

                if(query) {
                    this.setState({
                        headerText: "Searching For: " + query
                    })
                }
                else{
                    this.setState({
                        headerText:"Recent Buzz"
                    })
                }
            }
            
        })
    }         
    
    handleHomeClick = () => {
        this.props.history.push({
            pathname:"/Home",
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


    

     createContentExploreTweets = () => {
        const content =
            <div>
                {this.state.explorePosts.map( (element, index) => {
                    if(element.in_reply_to_postid === null){
                        return (
                        <div className="explore_post">

                            <Tweet postText={element.posttext} likes={element.likes_count} img={element.img_id} rebuzz={element.rebuzz_count}/>
                        </div>)
                    }else{

                    }
                })}
            </div>
        

        
     //   console.log(content)
        return content;
       
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

    updateHeader = () =>{
        if (this.state.headerText){
            return this.state.headerText;
        }
        else {
            return "Recent Buzz";
        }
    }
    render() {
        const posts = this.createContentExploreTweets();
        const text = this.updateHeader();
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
                            <Menu.Item key="2" icon={<CompassOutlined />}>
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
                <Content>
                    <div className="explore_page_center">
                        <div className="explore_page_header">
                            <div className="explore_page_header_search">
                                <center>
                                <Search placeholder="Search BeeYa" style={{ width: 400, 
                                    alignItems:"center", borderRadius:"30px"}} size="large" enterButton
                                    onSearch={(value) => this.searchPostsFetch(value)} allowClear
                                    minLength={1}/>
                                    
                                </center>
                            </div>
                            
                            <div className="explore_page_header_text">
                                <center>
                                    <br/>
                                    
                                    {text}
                                </center>
                            </div>
                        </div>
                        


                        <Row>
                            <Col span={24}>
                                {posts}
                            </Col>
                    </Row>  
                    </div>


                </Content>


                </Layout>
                
            </div>
        )
    }
}
