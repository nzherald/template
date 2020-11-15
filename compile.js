const fs = require('fs')
const App = require('./server/App').default
const minify = require('html-minifier').minify
const { name, homepage } = require('./package.json')

const app = App.render()

const render = (label, params) => {
  fs.writeFileSync(
    `ssr/${label}-hp.html`,
    minify(
      `
<section class="section-chain">
<div class="section-chain__wrapper">
<div id="nzh-datavis-root">
${app.html}
</div>
</div>
</section>
<link href="${homepage}embed.css" rel="stylesheet">
<script defer src="${homepage}prelaunch_v3.js"></script>
<script defer src="${homepage}embed.js"></script>
<script>window.addEventListener("load", function() { new window["${name}"]("#nzh-datavis-root", ${JSON.stringify(
        params,
      )})})</script>
`,
      { collapseWhitespace: true },
    ),
  )

  fs.writeFileSync(
    `ssr/${label}.html`,
    minify(
      `
<div id="nzh-datavis-root" class="nzh-datavis">
</div>
`,
      { collapseWhitespace: true },
    ),
  )

  fs.writeFileSync(
    `ssr/${label}-css.html`,
    minify(
      `
<div id="nzh-datavis-root" class="nzh-datavis">
<style>${app.css.code}</style>
${app.html}
</div>
`,
      { collapseWhitespace: true },
    ),
  )

  fs.writeFileSync(
    `ssr/${label}-footer.html`,
    `
<link href="${homepage}embed.css" rel="stylesheet">
<script defer src="${homepage}prelaunch_v3.js"></script>
<script defer src="${homepage}embed.js"></script>
<script>window.addEventListener("load", function() { new window["${name}"]("#nzh-datavis-root", ${JSON.stringify(
      params,
    )})})</script>
  `,
  )
}

render("app", {})
