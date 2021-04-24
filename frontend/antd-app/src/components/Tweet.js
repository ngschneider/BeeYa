import React, { Component } from 'react';


export default class Tweet extends  Component {

    constructor(){
        super();
        this.state = {

        }

    }

    componentDidMount(){

    }


    render() {
        console.log(this.props.postText)
        return (
            <div>
                <p> {this.props.postText} </p>
                {"Buzzes : " + this.props.likes + "      Rebuzz : " + this.props.rebuzz}
            </div>
            )
    }

}