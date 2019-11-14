# html-webpack-plugin-combiner

`html-webpack-plugin-combiner` is a wrap library for `html-webpack-plugin`.

If you specify the root directory of the source to be an html page, it will return an array instantiated with html-webpack-plugin.

## Installation

``` sh
npm install --save html-webpack-plugin-combiner
```

## Usage

webpack.config.js

### Before

``` js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PATH_SRC = './src';
const htmlList = [
  new HtmlWebpackPlugin({
    template: `${PATH_SRC}/pug/page/index.pug`,
    inject: false
  }),
  new HtmlWebpackPlugin({
    filename: "sub/index.html",
    template: `${PATH_SRC}/pug/page/sub/index.pug`,
    inject: false
  })
];

module.exports = {
  plugins: [
    ...htmlList
  ]
};
```

### After

``` js :src.js
const HtmlWebpackPluginCombiner = require("html-webpack-plugin-combiner");

const pugSrcRoute = "src/pug/page/";
const htmlList = new HtmlWebpackPluginCombiner(pugSrcRoute).htmlList;

module.exports = {
  plugins: [
    ...htmlList
  ]
};
```

## License

MIT
