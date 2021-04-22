import { Statistic, Row, Col, Button, Popover } from 'antd';
import React, { Component } from 'react';

import {getFollowers,getPosts} from '../Fetching/ProfileREST'
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
            this.setState({
                followers:response.followers,
                followerCount: response.followers.length
            });

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

    // Not working
    createContentFollowing = ()  => {
        let content =  <div>
            {this.state.followers.forEach( (element) => {
                <p> {element.followedUser + "since " + element.create_at} </p>
            })}
        </div>
        
        return content;
    }
    // Not working
    createContentMyTweets = ()  => {
        const content =  
        <div>
            {this.state.myPosts.map( (element, index) => {
                console.log(element.posttext);
                <p key={index}> {element.posttext} </p>;
            })}
        </div>
        
        console.log(content)
        return content;
    }

    render(){
        const following = this.createContentFollowing();

        const myTweets = this.createContentMyTweets();

        return (
            <div>
                {"Following : "}
                <Popover placement="bottom" title={"Following"} content={following} trigger="click">
                    <Button type="FollowerCount" size={'large'}>
                        {this.state.followerCount}
                    </Button>
                </Popover>
                <br/>
                {"My Tweets"}
                {myTweets}
            </div>
            );
    }

}
