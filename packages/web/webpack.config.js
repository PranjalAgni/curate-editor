const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.tsx",
  target: "web",
  mode: isProd ? "production" : "development",
  devtool: isProd ? "none" : "eval-source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        loader: "css-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hotOnly: true,
    host: "localhost",
    port: 3000,
    compress: true,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    watchOptions: {
      poll: true
    }
  }
};
