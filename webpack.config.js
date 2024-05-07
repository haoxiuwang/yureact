const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RemoveStrictModePlugin = require('./remove-strict-mode-plugin');


module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [    
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    // new RemoveStrictModePlugin(),
    // new HtmlWebpackPlugin({
    //   template: './public/index.html', // Update the path to index.html
    //   filename: 'index.html',
    //   inject: 'body',
    // }),
    new CopyWebpackPlugin({
     patterns: [
       {
         from: 'public',
         to: '',
       },
     ],
   }),
  ],
};
