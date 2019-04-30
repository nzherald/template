import "./loading.less"
import HTML from "./loading.html"
if (sessionStorage.getItem("loading") === "done") {
    console.log("Loading screen is too late to be useful.")
}
else {
    console.log("Loading screen created.")
    var root = document.getElementById("nzh-datavis-root")
    var loading = document.createElement("div")
    if (root) {
        loading.innerHTML = HTML
        root.appendChild(loading.firstChild)
    }
    else {
        console.error("Cannot find #nzh-datavis-root! Nothing will work!")
    }
}
