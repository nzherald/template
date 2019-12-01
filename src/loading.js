import "./loading.less"
import HTML from "./loading.html"
if (sessionStorage.getItem("loading") === "done") {
    console.log("Loading screen is too late to be useful.")
}
else {
    console.log("Loading screen created.")
    const ct = document.getElementsByClassName("nzh-datavis")[0]

    if (!ct) console.error("Cannot find root div using nzh-datavis! Nothing will work!")

    const el = document.createElement("div")
    el.innerHTML = HTML
    ct.innerHTML = ""
    ct.appendChild(el.firstChild)
}
