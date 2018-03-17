const Seqeunce = require("./Sequence");

function Manager(){
   this.sequences = [];
   this.streams = [];
}

Manager.prototype.create = function(...args){
    args.forEach((seq) => {
        this.sequences.push(new Seqeunce(seq));
    });
}

Manager.prototype.save = function(data){
    this.sequences.forEach((seq) => {
        seq.saveMatches(data, this.notifyAll.bind(this));
    });
    console.log(this.sequences)
}

Manager.prototype.saveStream = function(stream){
    this.streams.push(stream);
}

Manager.prototype.notifyAll = function(users){
    this.streams.forEach((stream)=>{
        if(users[stream.id]){
            this.send(stream, `notify user: ${stream.id}`);
        }
    })
}

Manager.prototype.send = function(stream, data){
    stream.write(`event: notify\ndata: ${data}\n\n`)
}

module.exports = new Manager;