const webpackConfig = require("../config/webpack.config");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware")
const Koa = require("koa");
const bodyParser = require("koa-body");
const serve  = require("koa-static");
const mount  = require("koa-mount");
const router = require("./router");

let app = new Koa;
// let compiler = webpack(webpackConfig);
app.use(mount("/static", serve("dist/")));
app.use(bodyParser());
// webpackDevMiddleware(compiler, {
//     publicPath: "/static"
// });
app.use(router.routes());
app.listen(8080);