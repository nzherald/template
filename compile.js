const fs = require('fs')

const App = require('./server/App').default

const { html } = App.render({})

fs.writeFileSync('src/root.html', html)
