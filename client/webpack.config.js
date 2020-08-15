const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const outputPath = path.resolve(__dirname, "dist");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: outputPath,
    filename: "[name].[hash].bundle.js",
    chunkFilename: "[name].[hash].bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      { test: /\.js(x?)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(mp3)$/,
        use: ["file-loader"],
      },
    ],
  },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: "./src/service-worker.js",
      swDest: "service-worker.js",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/manifest.webmanifest",
          to: outputPath,
        },
        {
          from: "src/Static/Icons/*.(png|ico)",
          to: outputPath,
          flatten: true,
        },
        {
          from: "src/offline.html",
          to: outputPath,
        },
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "/public"),
    historyApiFallback: true,
    port: 8081,
    compress: true,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
};
