import "./loading.less"
import HTML from "./loading.html"
if (sessionStorage.getItem("loading") === "done") {
    console.log("Loading screen is too late to be useful.")
}
else {
    console.log("Loading screen created.")
    var div = document.createElement('div')
    div.innerHTML = HTML
    document.body.appendChild(div.firstChild)
}
