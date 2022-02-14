module.exports = {
    configureWebpack: {
      devtool: "source-map"
    },
    publicPath: './', // webpack打包时, 所有的js和css插入到index.html的时候, 使用相对路径，也就是以此时的html所在的目录为根目录(dist下)去找js和css文件

  };