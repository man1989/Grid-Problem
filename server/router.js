const fs = require("fs");
const {PassThrough} = require("stream");
const Router = require("koa-router");
const manager = require("./Manager");

let router = new Router();
let html = fs.readFileSync("dist/index.html");
let users = {};

manager.create([1,2,3,4,5], [22,33,44,55]);

module.exports = router;

router.get('/', async (ctx, next) => {
    ctx.type = "text/html";
    ctx.body = html;
    ctx.status = 200;
}).get("/:user/grid/", async(ctx, next)=>{
    let {user: username} = ctx.params;
    ctx.type = "text/html";
    ctx.body = html;
    ctx.status = 200;
});

router.post("/:user/grid/sequence/", async(ctx, next)=>{
    let {user: username} = ctx.params;
    let data = ctx.request.body;    
    data.user = username;
    manager.save(data);
    ctx.status = 200;
});


router.get("/:user/grid/notify", async(ctx, next)=>{
    let stream = new PassThrough;
    let {user: username} = ctx.params;
    ctx.type = 'text/event-stream; charset=utf-8';
    ctx.set('Cache-Control', 'no-cache');
    ctx.set('Connection', 'keep-alive');
    stream.id = username;
    manager.saveStream(stream);
    ctx.body  = stream;
    ctx.status = 200;
});

function notifyAll(sequence){
    users.forEach((stream)=>{
        let hasContributed = !!sequence[stream.id];
        if(hasContributed){
            stream.write(`event: notify\ndata: hello, world ${stream.id}\n\n`);
        }
    });
}



