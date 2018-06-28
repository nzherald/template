/* Will add embed.js and embed.css to webpack build containing
 * code to add all the webpack produced css and js files.
 *
 * The purpose for this so that large files can be uploaded with
 * a decent cache timeout, and the small embed files can be essentially
 * uncached.
 *
 * The webpack entry points loading and root are special.
 * In the javascript loader loading is loaded before anything else
 * and then root is loaded.
 */

class EmbedPlugin {
    constructor (options) {
        this.options = options;
    }

    apply (compiler) {
        const self = this;

        compiler.hooks.emit.tap("EmbedPlugin", function(compilation, callback) {
            const basePath = self.options.basePath;
            let js = [];
            let css = [];
            let loading;
            let root;
            for (var filename in compilation.assets) {
                if (/.*\.css$/.test(filename)) {
                    css.push(filename);
                } else if (/.*\.js$/.test(filename)) {
                    if (/^loading.*js$/.test(filename)) {
                        loading = basePath + filename
                    } else if (/^root.*js$/.test(filename)) {
                        root = basePath + filename
                    }else {
                        js.push(filename);
                    }
                }
            }
            const clear = 'sessionStorage.setItem("loading", "not-done");'
            const loadingOnly = "var __XCloading = document.createElement('script'); __XCloading.src = '<<LOADING>>'; document.body.appendChild(__XCloading);"
            const rootOnly = "var __XCroot = document.createElement('script'); __XCroot.src = '<<ROOT>>'; document.body.appendChild(__XCroot);"
            const loadingRoot = clear + loadingOnly + rootOnly + '<<INNER>>'
            let jsTemplate = clear + '<<INNER>>'
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
                    valsStr = valsStr.concat(line(f,i));
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
            build(js,function(f,i) { return `var _js${i} = document.createElement('script'); 
                _js${i}.src = '${basePath}${f}'; 
                document.body.appendChild(_js${i});\n`}, jsTemplate, 'embed.js');
            build(css,function(f) { return `@import url("${basePath}${f}");\n`}, '<<INNER>>', 'embed.css');
        });
    }
}

module.exports = EmbedPlugin;
