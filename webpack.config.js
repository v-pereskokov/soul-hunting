const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    'bundle': './public/index.tsx'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public/built'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },

      {
        enforce: 'pre', test: /\.js$/,
        loader: 'source-map-loader'
      },

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css!sass")
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=10000!img?progressive=true'
      },

      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true
    })
  ]
};
