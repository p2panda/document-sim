const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const { experiments } = require("webpack");

module.exports = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  mode: "development",
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "index.html", to: "dist/index.html" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  experiments: {
    asyncWebAssembly: true,
  },
};
