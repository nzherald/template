class EmbedPlugin {
    constructor (options) {
        this.options = options;
    }

    apply (compiler) {
        const self = this;

        compiler.hooks.emit.tap("EmbedPlugin", function(compilation, callback) {
            let js = [];
            let css = [];
            for (var filename in compilation.assets) {
                if (/.*\.css$/.test(filename)) {
                    css.push(filename);
                } else if (/.*\.js$/.test(filename)) {
                    js.push(filename);
                }
            }
            const basePath = self.options.basePath;
            const build = function(vals,line,out) {
                if (vals.length) {
                    let valsStr = "";
                    vals.forEach(function(f) {
                        valsStr = valsStr.concat(line(f));
                    });
                    compilation.assets[out] = {
                        source: function() {
                            return valsStr;
                        },
                        size: function() {
                            return valsStr.length;
                        }
                    }
                }
            }
            build(js,function(f) { return `$.getScript("${basePath}${f}");\n`}, 'embed.js');
            build(css,function(f) { return `@import url("${basePath}${f}");\n`}, 'embed.css');
        });
    }
}

module.exports = EmbedPlugin;
