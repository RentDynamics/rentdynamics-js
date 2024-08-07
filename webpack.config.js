const webpack = require('webpack');
const path = require("path");
const PACKAGE = require("./package.json");

module.exports = {
  mode: "production", // Enable production optimizations
  entry: {
    [PACKAGE.version]: "./lib/index.ts", // Update entry point to your main TypeScript file
    latest: "./lib/index.ts",
  },
  output: {
    filename: "rentdynamics.[name].js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "module", // Output as an ES Module
      export: "Client", // Assuming 'Client' is the main export you want
    },
  },
  experiments: {
    outputModule: true, // Enable module output
  },
  optimization: {
    usedExports: true, // Mark used exports for better tree shaking
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: "whatwg-fetch",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
