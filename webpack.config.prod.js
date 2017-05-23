const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    'bundle': './public/index.tsx'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public/built'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader!awesome-typescript-loader'
      },

      {
        enforce: 'pre',
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader']
      },

      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
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
