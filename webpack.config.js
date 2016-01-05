require('./node_modules/coffee-script/register');

config = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: './example/index'
});

module.exports = config;