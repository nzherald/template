import Base from "./lib/base.js"
import HTML from "./root.html"
import "./root.less"


class Main extends Base {
    constructor () {
        console.log("Setting up visualisation...")
        super(HTML)
        console.log("Loading data...")
        null
        this.premiumWait(() => {
            console.log("Rendering...")
            null
            console.log("Done.")
            this.fadeOut()
        })
    }
}

new Main()
