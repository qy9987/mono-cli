const { name } = require('../../package.json')
const package = require('./package.json')
const { apps } = require('../../mono.config')
const app = apps.find(i=>i.name == package.name);
module.exports = {
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  },
  devServer: {
    port: app.port||null,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}