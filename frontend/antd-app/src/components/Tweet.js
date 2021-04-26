import React, { Component } from 'react';
import {Button, Image} from 'antd';

export default class Tweet extends  Component {

    constructor(){
        super();
        this.state = {
            likes:0,
            retweets:0,
            url:"https://storage.googleapis.com/techmenu/"
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
    generateImgTag = (url) => {
        console.log(url)
        return (
            <Image
            width={200}
            src={this.state.url + url}
          />
        );
    }

    render() {
        console.log(this.props.postText)
        let img;
        
        if(this.props.img !== null && this.props.img != 'null'){
            img =  this.generateImgTag(this.props.img);
            console.log(img);
        }else{
            img = " " ;
        }
        return (
            <div>
                <p> {this.props.postText} </p>
                {img}
                <Button type="Buzz" size={'small'} onClick={this.rebuzzOnClick()} > Buzz </Button>{this.state.likes} 
                 {"       "}     
                <Button type="Buzz" size={'small'} onClick={this.rebuzzOnClick()}> Rebuzz </Button>{this.state.retweets}
            </div>
            )
    }

}