var path = require("path");
var webpack = require("webpack");
var config = require('./config')

module.exports = {
  cache: true,
  target: 'web',
  debug: config.debug,
  watch: false,
  entry: {
      main: path.resolve( config.src + 'js/index.js' )
  },
  output: {
      path: config.public + 'js/',
      filename: 'app.bundle.js',
      sourceMapFilename: 'app.bundle.map'
  },
  devtool: 'source-map',
  resolve: {
    modulesDirectories: ['bower_components', 'node_modules', 'src/js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' }
    ],
    noParse: [
      /\.min\.js$/,
      /\jquery/
    ]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize:true})
  ]
}