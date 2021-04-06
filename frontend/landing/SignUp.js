import React, { Component } from 'react'


export default class CreateUser extends Component {
    constructor(props) {
        super(props);
    
    this.state = {
        username: "",
        displayname: "",
        email: "",
        password: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
}
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
