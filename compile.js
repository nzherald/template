const fs = require('fs')
const App = require('./server/App').default

const app = App.render()
// fs.writeFileSync('ssr/whitehouse.html', `<div><style>${app.css.code}</style>${app.html}</div>`)
fs.writeFileSync('ssr/app.html', `<div>${app.html}</div>`)
