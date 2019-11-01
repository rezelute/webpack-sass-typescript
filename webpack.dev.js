const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: { //webpack live dev server
    contentBase: "./src", //watch src (includes watching html changes)
    watchContentBase: true,
    port: 9000
    //compress: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.dev.[hash].js'
  },
  plugins: [
     //copies the template html into dist
     new HtmlWebpackPlugin({
      template: "./src/template.html"
     }),
    
    //extracts webpack css to seperate file
    new MiniCssExtractPlugin({
      filename: '[name].dev.[hash].css'
    }),
  ],
});