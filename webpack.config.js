const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devServer: {
    contentBase: path.join(__dirname, 'static'),
    watchContentBase: true,
    port: 9001
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'style.css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new VueLoaderPlugin()
  ],
  entry: "./ts/index.ts",
  output: {
    filename: "dist/js/bundle.js",
    path: __dirname
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".vue", '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@images': path.resolve(__dirname, 'images/')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          { loader: "babel-loader" },
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: __dirname,
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: __dirname,
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  }
};