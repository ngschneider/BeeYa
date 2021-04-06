import React, {Component} from 'react';

export default class User extends Component {
    constructor(props) {
        super(props);
    
    this.state = {
        username: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
}

handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
}
 

handleSubmit(event) {
    console.log("Submitted");
    event.preventDefault();
}
    render() {
    }
}