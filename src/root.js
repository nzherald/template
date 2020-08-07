// import ENV from "Environment"
import Base from "./lib/base.js"
import { appWarn } from "./lib/util.js"
import HTML from "./root.html"
import "./root.less"

class Main extends Base {
    constructor (selector, params) {
        console.log("Setting up visualisation with parameters:", params)
        super(selector, HTML)
        console.log("Loading data...")
        this.premiumWait(async () => {
            const { default: App } = await import("./App.svelte")
            console.log("Rendering...")
            new App({
                target: this.root.node,
                hydrate: true,
                props: {
                    name: 'world'
                }
            });
            console.log("Done.")
            if (params.appWarn) {
                appWarn(this.root.selector, params.appWarn, params.category)
            }
        })
    }
}

window.Main = window.UniqClassName = Main

// This appears to work for speeding up things
// The onload event is very late in NZH (due to some of the ad loading etc)
// This feels super dodgy so just delete it if something seems flaky
window.onload()
window.onload = null
