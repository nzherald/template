const fs = require('fs')
require('svelte/register')({
    hydratable: true
  })

const App = require('./src/App.svelte').default

const { html } = App.render({
    name: 'letconst'
 })


 fs.writeFileSync("src/root.html", html)