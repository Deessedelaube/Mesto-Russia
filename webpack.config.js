const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/pages/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),

  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // правило для картинок и шрифтов
        test: /\.(png|svg|jpg|gif|woff2|woff)$/,
        loader: 'file-loader'
      },
      {
        //правило для html
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // правило к CSS-файлам
          test: /\.css$/,
          use:  [MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader']
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  }),
  new MiniCssExtractPlugin()
  ],

  devtool: 'inline-source-map',

};
