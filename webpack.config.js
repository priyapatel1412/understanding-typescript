const path = require('path');

module.exports = {
  mode: 'development',
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
    publicPath: '/dist/', // require for web-pack dev-server
  },
  // Generated source-map available for debugging by making "sourceMap": true in tsconfig.json
  devtool: 'inline-source-map',
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
};
