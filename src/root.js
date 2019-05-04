import HTML from "./root.html"
import "./base.less"
import "./root.less"

import {Runtime, Inspector} from "@observablehq/runtime"
import notebook from "2019-h-1b-employers"


class Main {
    constructor () {
        var root = document.getElementById('nzh-datavis-root')
        Runtime.load(notebook, (cell) => {
            if (cell.name === "chart") {
                return {
                    fulfilled: (value) => {
                        root.appendChild(value);
                    }
                };
            }
        });
        this.fadeOut(root)
    }

    fadeOut (root, b) {
        sessionStorage.setItem("loading", "done");
        if (typeof($) !== "undefined") {
            $("#loading").fadeTo(600, 0.01, () => {
                $("#loading").remove()
                console.log("Loading screen removed.")
                if (b) b()
            })
        } else {
            var loadingRemove = document.getElementById("loading")
            if (loadingRemove) {
                root.removeChild(loadingRemove)
                console.log("Loading screen removed.")
            }
            if (b) b()
        }
    }
}

new Main()
