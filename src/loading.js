import "./loading.less"
import HTML from "./loading.html"
if (sessionStorage.getItem("loading") === "done") {
    console.log("Loading screen is too late to be useful.")
}
else {
    console.log("Loading screen created.")
    const root = document.currentScript.getAttribute("data-targ")
    if (!root) console.error("Root div not defined! Make sure data-targ has been set on the script tag.")

    const ct = document.querySelector(root)
    if (!ct) console.error("Cannot find root div " + root + "! Nothing will work!")

    const el = document.createElement("div")
    el.innerHTML = HTML
    ct.appendChild(el.firstChild)
}
