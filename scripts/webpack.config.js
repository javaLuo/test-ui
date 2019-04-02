var path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(process.cwd(), 'example', 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader'],
        include: [path.join(process.cwd(), 'example', 'src')],
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less?$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader?limit=8132&name=images/[name].[ext]'],
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|pdf|png)(\?|$)/,
        use: ['file-loader?name=files/[name].[ext]'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(process.cwd(), 'example'),
  },
};
