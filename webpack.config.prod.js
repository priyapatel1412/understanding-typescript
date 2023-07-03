const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    // provide absolute PATH to dist folder
    path: path.resolve(__dirname, 'dist'),
  },
  // Generated source-map available for debugging by making "sourceMap": true in tsconfig.json
  //   devtool: 'none',
  // rules to compile app.ts files to javascript files
  module: {
    rules: [
      {
        test: /\.ts$/, // take all files that ends with .ts
        use: 'ts-loader', // use ts-loader to compile all files to js, ts-loader will take tsconfig into account
        exclude: /node_modules/, // don't try to look in node_modules
      },
    ],
  },
  resolve: {
    // Look for .ts files and .js files
    extensions: ['.js', '.ts'],
  },
  plugins: [
    //clean up dist folder when we rebuild project, before writing anything
    new CleanPlugin.CleanWebpackPlugin(),
  ],
};
