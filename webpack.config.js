const path = require('path')
const nodeExternals = require('webpack-node-externals')
const json = require('./package.json')
const getPath = path => path.substring(0, path.lastIndexOf('/'))
const getFile = path => path.substring(path.lastIndexOf('/') + 1)
const mode = process.env.NODE_ENV
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin');
const { DefinePlugin } = webpack

const config = mode => {
  const isDev = mode !== 'production'
  const name = `${json.name}${isDev ? '.dev' : ''}`
  return {
    plugins: [
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      new ESLintPlugin({
        failOnWarning: true,
        failOnError: true
      })
    ],
    entry: `./${json.src}`,
    output: {
      filename: `${name}.js`,
      path: path.resolve(__dirname, getPath(json.main)),
      library: json.name,
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    externals: [nodeExternals(), 'react'],
    mode: 'production',
    optimization: {
      minimize: true,
      chunkIds: isDev ? 'named' : 'natural',
      moduleIds: isDev ? 'named' : 'natural'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                injectType: 'lazyStyleTag'
              }
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              }
            }
          ]
        }
      ]
    }
  }
}


module.exports = [
  config('development'),
  config('production')
]
