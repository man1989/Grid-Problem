import React, {Component} from "react";

export default class Login extends Component{
    constructor(){
        super()
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(evt){
        evt.preventDefault();
        window.location.href = `${window.location.href}${this.state.username}/grid/`;
    }
    handleChange(evt){
        this.setState({username: evt.target.value})
    }
    render(){
        return (
            <form method="POST" onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        <span>username: </span>
                        <input name="username" type="text" autoComplete="none" onChange={this.handleChange}/>
                    </label>
                </div>
            </form>
        )
    }
}