const ExtractTextPlugin = require("extract-text-webpack-plugin");
const combineLoaders = require('webpack-combine-loaders');

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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"'
        }),
      },

      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader?limit=10000!img-loader?progressive=true'
      },

      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ],

  devServer: {
    contentBase: './public/',
    publicPath: '/built/'
  }
};
