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
      //SASS LOADER
      {
        test: /\.s[ac]ss$/i,
        use: [
          //3. Plugin splits the css into a seperate file
          MiniCssExtractPlugin.loader,
          //3. Injects styles into the DOM
          //"style-loader"
          //2. Turns css into commonjs
          "css-loader",
          //1.Compiles Sass to CSS
          "sass-loader"
        ],
        exclude: /node_modules/,
      },
    ],
  },
  // resolve: {
  //   extensions: ['.tsx', '.ts', '.js'],
  // },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[name].[contentHash].css'
    // }),
  ],
};