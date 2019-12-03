const path = require('path')
const webpack = require('webpack')
// const uglify = require('uglifyjs-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js', // 入口文件，就是上步骤的src目录下的index.js文件，
  output: {
    path: path.resolve(__dirname, '../dist'), // 输出路径，就是上步骤中新建的dist目录，
    publicPath: '/dist/',
    filename: 'moan.min.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['transform-vue-jsx']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
