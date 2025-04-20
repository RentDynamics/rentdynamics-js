var PACKAGE = require('./package.json');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    [PACKAGE.version]: './dist/index.js'
  },
  output: {
    filename: 'rentdynamics.[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'RentDynamics'
  },
  resolve: {
    fallback: {
      util: false,
      crypto: false
    }
  }
};
