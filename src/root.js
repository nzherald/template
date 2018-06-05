import HTML from "./root.html"
import "./base.less"
import "./root.less"


class Main {
    constructor () {
        $(HTML).appendTo("#root")
        this.fadeOut()
    }

    fadeOut (b) {
        localStorage.setItem("loading", "done");
        $("#loading").fadeTo(600, 0.01, () => {
            $("#loading").remove()
            console.log("Loading screen removed.")
            if (b) b()
        })
    }
}

new Main()
