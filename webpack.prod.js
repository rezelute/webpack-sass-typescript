const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssOptimizePlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); //doesnt need to be included in package.json
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.[contentHash].js'
  },
  optimization: {
    minimizer: [
      new CssOptimizePlugin(),
      //by adding css minimizer, JS will no longer be minified (default) so we have to re-add it
      new TerserPlugin()
    ]
  },
  plugins: [
    //extract css into seperate file
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css'
    }),

    //copies the template html into dist
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),

    //clean hashes so that on each build, previous versions of hashes are removed
    new CleanWebpackPlugin(),
  ],

  module: {
    rules: [
      //SASS LOADER
      {
        test: /\.s[ac]ss$/i,
        use: [
          //3. Plugin splits the css into a seperate file
          MiniCssExtractPlugin.loader,
          //2. Turns css into commonjs
          "css-loader",
          //1.Compiles Sass to CSS
          "sass-loader"
        ],
        exclude: /node_modules/
      },
    ]
  }
});