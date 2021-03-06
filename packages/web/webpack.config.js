require("dotenv-safe").config({ allowEmptyValues: true });
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.tsx",
  target: "web",
  mode: isProd ? "production" : "development",
  devtool: isProd ? "none" : "cheap-module-source-map",
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      BASE_API_URL: JSON.stringify(process.env.BASE_API_URL)
    })
  ],
  devServer: {
    hot: true,
    inline: true,
    host: "localhost",
    port: 3030,
    compress: true,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true,
    watchOptions: {
      poll: true
    },
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: false,
      publicPath: false
    }
  }
};
