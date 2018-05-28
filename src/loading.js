import "./loading.less"
import HTML from "./loading.html"
console.log("Loader created.")
let doc = new DOMParser().parseFromString(HTML, "text/html")
document.body.appendChild(doc.firstChild)
