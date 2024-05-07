class RemoveStrictModePlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('RemoveStrictModePlugin', (compilation) => {
      compilation.hooks.processAssets.tap({
        name: 'RemoveStrictModePlugin',
        stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
        additionalAssets: [],
      }, (files) => {
        console.log("----------------");
        let arr = files["js/app.bundle.js"]["_source"]["_children"]
        arr = arr.map((item)=>{
          if( typeof item == "string")
          return item.replace(/(\"use strict\")/img,"\/\/$1")
          return item
        })
        files["js/app.bundle.js"]["_source"]["_children"] = arr
        return files
      });
    });
  }
}


module.exports = RemoveStrictModePlugin;
