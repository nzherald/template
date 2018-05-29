class EmbedPlugin {
    constructor (options) {
        this.options = options;
    }

    apply (compiler) {
        const self = this;

        compiler.hooks.emit.tap("EmbedPlugin", function(compilation, callback) {
            let js = [];
            let css = [];
            let loading;
            let root;
            for (var filename in compilation.assets) {
                if (/.*\.css$/.test(filename)) {
                    css.push(filename);
                } else if (/.*\.js$/.test(filename)) {
                    if (/^loading.*js$/.test(filename)) {
                        loading = filename
                    } else if (/^root.*js$/.test(filename)) {
                        root = filename
                    }else {
                        js.push(filename);
                    }
                }
            }
            const basePath = self.options.basePath;
            const loadingOnly = "$.getScript('<<LOADING>>', function() {<<INNER>>});"
            const rootOnly = "$.getScript('<<ROOT>>', function() {<<INNER>>});"
            const loadingRoot = "$.getScript('<<LOADING>>', function() {$.getScript('<<ROOT>>', function() {<<INNER>>})});"
            let jsTemplate = '<<INNER>>'
            if (loading && root) {
                jsTemplate = loadingRoot
                    .replace('<<LOADING>>', loading)
                    .replace('<<ROOT>>', root)
            } else if (root) {
                jsTemplate = rootOnly.replace('<<ROOT>>', root)
            } else if (loading) {
                jsTemplate = loadingOnly.replace('<<LOADING>>', loading)
            }
            const build = function(vals,line,template,out) {
                let valsStr = "";
                vals.forEach(function(f,i) {
                    valsStr = valsStr.concat(line(f));
                });
                const output = template.replace('<<INNER>>', valsStr);

                if (output.length) {
                    compilation.assets[out] = {
                        source: function() {
                            return output
                        },
                        size: function() {
                            return output.length;
                        }
                    }
                }
            }
            build(js,function(f) { return `$.getScript("${basePath}${f}");\n`}, jsTemplate, 'embed.js');
            build(css,function(f) { return `@import url("${basePath}${f}");\n`}, '<<INNER>>', 'embed.css');
        });
    }
}

module.exports = EmbedPlugin;
