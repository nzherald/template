import HTML from "./root.html"
import "./base.less"
import "./root.less"


class Main {
    constructor () {
        if (typeof($) !== "undefined") {
        $(HTML).appendTo("#root")
        } else {
            var root = document.getElementById('root')
            root.innerHTML = HTML

        }
        this.fadeOut()
    }

    fadeOut (b) {
        localStorage.setItem("loading", "done");
        if (typeof($) !== "undefined") {
            $("#loading").fadeTo(600, 0.01, () => {
                $("#loading").remove()
                console.log("Loading screen removed.")
                if (b) b()
            })
        } else {
            var loadingRemove = document.getElementById("loading")
            if (loadingRemove) {
                document.body.removeChild(loadingE)
                console.log("Loading screen removed.")
            }
            if (b) b()
        }
    }
}

new Main()
