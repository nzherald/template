import "./loading.less"
import HTML from "./loading.html"
if (sessionStorage.getItem("loading") === "done") {
    console.log("Loading screen is too late to be useful.")
}
else {
    console.log("Loading screen created.")
    const root = document.currentScript.getAttribute("data-targ") || "#nzh-datavis-root"
    const ct = (root[0] === "#") ? document.getElementById(root.substr(1)) :
               (root[0] === ".") ? document.getElementsByClassName(root.substr(1)) :
               null
    if (ct) {
        const el = document.createElement("div")
        el.innerHTML = HTML
        ct.appendChild(el.firstChild)
    }
    else {
        console.error("Cannot find root div " + root + "! Nothing will work!")
    }
}
