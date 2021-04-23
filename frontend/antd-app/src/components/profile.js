import { Statistic, Row, Col, Button, Popover } from 'antd';
import React, { Component } from 'react';

import {getFollowers,getPosts} from '../Fetching/ProfileREST'
import Tweet from './Tweet';
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
                    return <Tweet postText={element.posttext} likes={element.likes_count} rebuzz={element.rebuzz_count}/>
                }else{

                }
            })}
        </div>
        
     //   console.log(content)
        return content;
    }

    render(){
        
        const following = this.createContentFollowing();

        const myTweets = this.createContentMyTweets();

        return (

            <div>
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
                <br/>

                <center>
                {"My Tweets"}
                {myTweets}
                </center>
            </div>
            );
    }

}
