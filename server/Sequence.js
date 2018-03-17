/**
 * data = {timestamp, value, user}
 * 
 * 
 */

const EventEmitter = require("events");
function Seqeunce(seq){
    this.next = 0;
    this.users = {};
    this.sequence = seq || []
}

Seqeunce.prototype.checkValue = function(data){
    if(Number(data.value) === this.sequence[this.next]){
        return  true;
    }
    return false;
}

Seqeunce.prototype.saveMatches = function(data, notifyAll){
    if(this.checkValue(data)){
        this.next++;
        this.users[data.user] = data;
    }
    if(this.isDone()){
        notifyAll(this.users);
        this.next = 0;
        this.users = [];
    }
}

Seqeunce.prototype.isDone = function(){
    return (this.next === this.sequence.length)
}

module.exports = Seqeunce;