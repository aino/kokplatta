var path = require("path");
var webpack = require("webpack");
var config = require('./config')

module.exports = {
  cache: true,
  target: 'web',
  debug: false,//config.debug,
  watch: false,
  entry: {
      main: path.resolve( config.src + 'js/index.jsx' )
  },
  output: {
      path: config.public + 'js/',
      filename: 'all.bundle.js'
  },
  resolve: {
    modulesDirectories: ['bower_components', 'src/js']
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' },
      { test: /\.js$/, loader: 'script' }
    ],
    noParse: /\.min\.js/
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize:true})
  ]
}