import "./base.less"
import "./root.less"
import Template from "./lib/module-template.js"
import HTML from "root.html"


class Main {
    constructor () {
        $(HTML).appendTo("#root")
        const T = new Template({
            container: "#root"
        })
        $("#loading").fadeTo(600, 0.01, () => {
            $("#loading").remove()
            console.log("Loader removed.")
        })
    }
}

new Main()
