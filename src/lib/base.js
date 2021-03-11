import "./base.less"

class Base {
    constructor(selector, html) {
        this.root = { selector, node: window.document.querySelector(selector) }
        if (!this.root.node) console.error(`Cannot find element ${selector}! Nothing will work!`)
        this.root.node.innerHTML = html
        this.root.node.classList.add("nzh-datavis")
        this.root.node.classList.add(ENV.name)
    }

    premiumWait(params, render) {
        const el = document.querySelector(".article__content")
        if (this.appCheck(params)) return
        // Inside premium container - wait for premium container to come down
        if (el && !el.classList.contains("full-content")) {
            console.log("Waiting for paywall to come down.")
            const observer = new MutationObserver(() => {
                if (el.classList.contains("full-content")) {
                    console.log("Paywall is down.")
                    render()
                    console.log("Rendering done.")
                    observer.disconnect()
                }
            })
            observer.observe(el, { attributes: true })
        }
        // Normal deployment - go when ready
        else {
            console.log("No paywall detected.")
            render()
            console.log("Rendering done.")
        }
    }

    appCheck(params) {
        if (!params || !params.appRedirect) return false
        if (!window.hasOwnProperty("ReactNativeWebView")) { console.log("Not in app."); return false; }

        if (document.getElementById("rnahw-wrapper")) {
            console.log("Removing custom app styles..")
            const styles = document.head.getElementsByTagName("style")
            for (let i = 0; i < styles.length; i++) {
                styles[i].innerHTML = styles[i].innerHTML.replace(/\* \{[\s\S]*?\}/, "")
            }
        }

        console.log("Creating app redirect...")
        const node = this.root.node
        const link = document.createElement("a")
        const div = document.createElement("div")
        div.innerText = params.message || "Click here for the full interactive experience"
        link.setAttribute("_target", "blank") // DO NOT REMOVE: THIS IS SECRET SAUCE FOR GETTING LINKS TO WORK INSIDE THE APP, YES IT'S SUPPOSED TO BE '_target="blank"'
        link.setAttribute("href", params.appRedirect)
        link.innerHTML = div.outerHTML
        node.classList.add("app-redirect")
        node.innerHTML = link.outerHTML
        console.log("App redirect created.")
        return true
    }
}

export default Base
