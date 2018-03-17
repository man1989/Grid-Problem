import React, {Component} from "react";
import ReactDOM from "react-dom";
import Login from "./components/Login";
import Grid from "./components/Grid";

let mapping = {
    "login": Login,
    "grid": Grid
}
class App extends Component{
    constructor(){
        super();
    }
    render(){
        let Child = mapping[this.props.child]
        return (
            <Child nType={this.props.nType}/>
        )
    }
}

let root = document.getElementById("container");

function render(){
    let pattern = /\/(grid)\//;
    let route = window.location.pathname;
    let matched = route.match(pattern);
    route = matched ? matched[1] : "login";
    console.log("route: ", route);
    ReactDOM.render(<App child={route} nType={8}/>, root);
}
window.addEventListener("load", render)
