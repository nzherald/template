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
        if (!el) {
            console.error("Cannot find top element for article (\".article__content\")!")
        }
        // Inside premium container - wait for premium container to come down
        else if (!el.classList.contains("full-content")) {
            console.log("Waiting for paywall to come down.")
            const observer = new MutationObserver(() => {
                if (el.classList.contains("full-content")) {
                    this.appCheck(params)
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
            this.appCheck(params)
            render()
            console.log("Rendering done.")
        }
    }

    appCheck(params) {
        if (!params || !params.appRedirect) return
        if (!window.hasOwnProperty("ReactNativeWebView")) return console.log("Not in app.")

        if (document.getElementById("rnahw-wrapper")) {
            console.log("Removing custom app styles..")
            const styles = document.head.getElementsByTagName("style")
            for (let i = 0; i < styles.length; i++) {
                styles[i].innerHTML = styles[i].innerHTML.replace(/\* \{[\s\S]*?\}/, "")
            }
        }

        console.log("Creating app redirect...")
        const node = document.querySelector(selector)
        const link = document.createElement("a")
        const div = document.createElement("div")
        div.innerText = params.message || "Click here for the full interactive experience"
        link.setAttribute("_target", "blank") // DO NOT REMOVE: THIS IS SECRET SAUCE FOR GETTING LINKS TO WORK INSIDE THE APP, YES IT'S SUPPOSED TO BE '_target="blank"'
        link.setAttribute("href", params.appRedirect)
        link.innerHTML = div.outerHTML
        node.classList.add("nzh-datavis") // DO NOT REMOVE: APP GIVES SPECIAL TREATMENT TO THIS CLASS
        node.classList.add("app-redirect")
        node.prepend(link)
        console.log("App redirect created.")
    }
}

export default Base
