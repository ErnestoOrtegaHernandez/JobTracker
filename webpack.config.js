const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: __dirname + '/client/src/App.jsx',
  output: {
    filename: "bundle.js",
    path: __dirname + '/client/dist',
  },
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

    ],
  },
}