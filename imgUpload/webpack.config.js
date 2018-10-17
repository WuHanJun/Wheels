'use strict'

// @see https://dev.securitystack.cn/ctu-group/ctu-ua/blob/master/webpack.config.js
// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const webpack = require('webpack')
const moment = require('moment')

const config = {
  base: {
    node: {
      setImmediate: false
    },
    entry: {
      index: './src/imgUpload.js'
    },
    output: {
      path: path.join(__dirname, './public'),
      filename: '[name].js',
      library: '[name]',
      libraryTarget: 'umd'
    },
    devtool: 'source-map',
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.less$/,
        loader: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ],
        exclude: /node_modules/
      }, {
        test: /\.(png|gif)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader?limit=10000&mimetype=image/png',
            options: {
              config: {
                publicPath: './dist'
              }
            }
          }
        ]
      }]
    },
    plugins: []
  },
  dev: {
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      host: '0.0.0.0',
      disableHostCheck: true
    }
  },
  test: {
    plugins: []
  },
  prod: {
    plugins: [
      new webpack.BannerPlugin(
        `imgUpload.js ${moment().format('YYYY-MM-DD HH:mm:ss')}`
      )
    ]
  }
}

module.exports = function (env) {
  return Object.assign(config.base, config[env])
}
