//const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: ['./src/ts/app.ts', './src/scss/app.scss'],
  module: {
    rules: [
      //TYPESCRIPT COMPILER
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      //IMAGE COMPILER (finds images in html and requires it)
      //Webpack wont know how to handle the image until file loader kicks in
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: /node_modules/,
      },
      //FILE LOADER (helps webpack know how to handle required images)
      {
        test: /\.{svg|png|jpg|gif}$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets/imgs"
          }
        }
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', ".json"],
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[name].[contentHash].css'
    // }),
  ],
};