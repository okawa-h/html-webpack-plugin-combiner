'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');

class HtmlWebpackPluginCombiner {

  constructor(srcRoute) {

    this.srcRoute = srcRoute;
    this.htmlList = [];
    this.createHtmlList()

  }

  createHtmlList() {

    const list = this.getDirectoryAllListSync(this.srcRoute);
    for (let src of list) {
      this.htmlList.push(
        new HtmlWebpackPlugin({
          filename: src.filename,
          template: src.template,
          inject: false
        })
      );
    }

  }

  getDirectoryAllListSync(folderPath) {

    let result = [];
    const readTopDirSync = folderPath => {
      let items = fs.readdirSync(folderPath);
      items = items.map(itemName => {
        return path.join(folderPath, itemName);
      });
      items.forEach(itemPath => {
        if (path.extname(itemPath) === '.pug') {

          const dir = itemPath.replace(this.srcRoute, '').replace(path.basename(itemPath), '');
          const name = path.basename(itemPath, path.extname(itemPath));
          result.push({
            filename: `${dir}${name}.html`,
            template: './' + itemPath
          });

        }
        if (fs.statSync(itemPath).isDirectory()) readTopDirSync(itemPath);
      });
    };
    readTopDirSync(folderPath);
    return result;

  }

}

module.exports = HtmlWebpackPluginCombiner;
