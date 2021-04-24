import React, { Component } from 'react';
import {Button} from 'antd';

export default class Tweet extends  Component {

    constructor(){
        super();
        this.state = {
            likes:0,
            retweets:0
        }

    }

    componentDidMount(){
        this.setState({
            likes:this.props.likes,
            retweets:this.props.rebuzz
        });
    }

    buzzOnClick(){
        
    }

    rebuzzOnClick(){

    }

    render() {
        console.log(this.props.postText)
        return (
            <div>
                <p> {this.props.postText} </p>
                <Button type="Buzz" size={'small'} onClick={this.rebuzzOnClick()} > Buzz </Button>{this.state.likes} 
                 {"       "}     
                <Button type="Buzz" size={'small'} onClick={this.rebuzzOnClick()}> Rebuzz </Button>{this.state.retweets}
            </div>
            )
    }

}