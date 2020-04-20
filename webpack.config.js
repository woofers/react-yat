const path = require('path')
const nodeExternals = require('webpack-node-externals')
const json = require('./package.json')
const getPath = path => path.substring(0, path.lastIndexOf('/'))
const getFile = path => path.substring(path.lastIndexOf('/') + 1)
const mode = process.env.NODE_ENV
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin')
const webpack = require('webpack')
const { EnvironmentPlugin } = webpack

const isDev = mode !== 'production'
const name = `${json.name}${isDev ? '.dev' : ''}`

module.exports = {
  plugins: [
    new PeerDepsExternalsPlugin(),
    new EnvironmentPlugin(['NODE_ENV'])
  ],
  entry: `./${json.src}`,
  output: {
    filename: `${name}.js`,
    path: path.resolve(__dirname, getPath(json.main)),
    library: json.name,
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: [nodeExternals()],
  mode: 'production',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
        options: {
          failOnWarning: true,
          failOnError: true
        }
      },
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
            query: {
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
