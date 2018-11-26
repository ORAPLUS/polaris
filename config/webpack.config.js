const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const isDevelopment = process.env.NODE_ENV !== "production";

const sourceMap = isDevelopment;
const plugins = isDevelopment
  ? [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development")
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  : [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
      })
    ];

const extraEntryFiles = isDevelopment
  ? ["react-hot-loader/patch", "webpack-hot-middleware/client"]
  : [];

module.exports = {
  mode: "production",
  plugins,
  target: "web",
  devtool: false,
  entry: {
    main: [
      ...extraEntryFiles,
      "@shopify/polaris/styles.css",
      path.resolve(__dirname, "../client/index.js")
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../assets"),
    publicPath: "/assets/",
    libraryTarget: "var"
  },
  performance: {
    hints: false,
    maxEntrypointSize: 400000,
    maxAssetSize: 100000
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        rules: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            query: {
              sourceMap,
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]-[local]_[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => autoprefixer(),
              sourceMap
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "../node_modules/@shopify/polaris"),
        rules: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            query: {
              sourceMap,
              modules: true,
              importLoaders: 1,
              localIdentName: "[local]"
            }
          }
        ]
      }
    ]
  }
};
