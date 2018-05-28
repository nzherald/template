import "./base.less"
import "./root.less"
import HTML from "./root.html"


class Main {
    constructor () {
        $(HTML).appendTo("#root")
        $("#loading").fadeTo(600, 0.01, () => {
            $("#loading").remove()
            console.log("Loader removed.")
        })
    }
}

new Main()
