const fs = require('fs')

const App = require('./server/App').default


const { html } = App.render({
    name: 'letconst'
 })

 fs.writeFileSync("src/root.html", html)