import React, {Component} from "react";

let style = {
    width: "50px",
    height: "50px",
    cursor: "pointer"
}

export default class Grid extends Component{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        if(e.target.nodeName==="BUTTON"){
            let btn = e.target;
            let url = window.location.pathname+"sequence/";
            btn.setAttribute("data-selected", "");
            btn.style.backgroundColor = "lightgreen";
            let payload = {
                value: btn.id,
                timestamp: new Date().getTime()
            }
            fetch(url, {
                method:"POST",
                body: JSON.stringify(payload),
                headers:{
                    "content-type": "application/json"
                }
            });
        }
    }
    render(){
        let id = 0;
        let results = [];
        for(let i=0; i<this.props.nType; i++){
            for(let j=0; j<this.props.nType; j++){
                id++;
                results.push(<button id={id} key={id} style={style}>{id}</button>);
            }
            results.push(<br key={'key_'+i}/>);
        }       

        let url = window.location.pathname+"notify";
        let eventSource = new EventSource(url);

        eventSource.addEventListener("message", (e)=>{
            console.log(e.data);
        });
        eventSource.addEventListener("notify", (e)=>{
            let btns = document.querySelectorAll("button[data-selected]");
            btns.forEach((btn)=>{
                btn.style.backgroundColor = "";
            });
            console.log("got it", e.data);
        });
        eventSource.addEventListener("error", (err)=>{
            console.log("error: ", err);
            eventSource.close();
        })
        return (
            <div className="grid" onClick={this.handleClick}>{results}</div>
        );        
    }
}