const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const src = path.join(__dirname, "../src");
const dist = path.join(__dirname, "../dist");

let htmlPlugin = new HtmlWebpackPlugin({
    filename: "index.html",
    template: `${src}/index.html`
})

module.exports = {
    entry: {
        app: `${src}/App.js`
    },
    output: {
        filename: "js/[name].js",
        path: `${dist}/`,
        publicPath: "/static"
    },
    module: {
        rules:[{
            test: /\.jsx$|\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader"
            }]
        }]
    },
    mode:"development",
    plugins: [htmlPlugin]
}