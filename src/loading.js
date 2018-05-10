import "./loading.less"
const HTML = require("./loading.html")
let doc = new DOMParser().parseFromString(HTML, "text/html")
document.body.appendChild(doc.firstChild)
