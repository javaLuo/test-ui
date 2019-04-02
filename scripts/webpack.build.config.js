const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin'); // 优化js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { name } = require('../package.json');
module.exports = {
  mode: 'production',
  // 页面入口文件配置
  entry: {
    [name]: ['./components/index.js'],
  },
  // 输出文件配置
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].min.js',
    library: name,
    libraryTarget: 'umd',
    // libraryExport: 'default',
    // umdNamedDefine: true,
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多线程并行构建
        terserOptions: {
          output: {
            comments: false, // 不保留注释
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        // 压缩css  与 ExtractTextPlugin 配合使用
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } }, // 移除所有注释
        canPrint: true, // 是否向控制台打印消息
      }),
    ],
  },
  // 解析器配置
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader'],
        exclude: '/node_modules/',
        include: [path.resolve('components')],
      },
      {
        test: /\.css?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'postcss-loader', options: { sourceMap: false } }],
      },
      {
        test: /\.less?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'postcss-loader', options: { sourceMap: false } }, { loader: 'less-loader', options: { sourceMap: false } }],
      },
      {
        test: /\.(png|jpg|jpeg|ico|gif)$/,
        use: ['url-loader?limit=8192&name=images/[name].[ext]'],
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|pdf)(\?|$)/,
        use: ['file-loader?name=files/[name].[ext]'],
      },
    ],
  },
  // 第3方插件配置
  plugins: [
    // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    //用来优化生成的代码 chunk,合并相同的代码
    new webpack.optimize.AggressiveMergingPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
  ],
  // 其他解决方案配置
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css'], //后缀名自动补全
  },
};
