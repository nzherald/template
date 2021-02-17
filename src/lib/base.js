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
        // Inside premium container - wait for premium container to come down
        const el = document.querySelector("#article-content")
        if (el && el.classList.contains("premium-content")) {
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
        if (!params.zenId || !window.hasOwnProperty("ReactNativeWebView")) return
        const node = document.querySelector(this.root.selector)
        const link = document.createElement("a")
        link.setAttribute("_target", "blank")
        link.setAttribute("href", `https://www.nzherald.co.nz/${params.category || "nz"}/news/article.cfm?&objectid=${params.zenId}`)
        link.innerText = "here"
        const div = document.createElement("div")
        div.style["font-style"] = "italic"
        div.style["font-family"] = "Stag Sans Light"
        div.style["padding"] = "10px 15px"
        div.style["border"] = "solid 1px #4C585E"
        div.style["border-radius"] = "8px"
        div.style["color"] = "#4C585E"
        div.style["text-align"] = "center"
        div.style["line-height"] = "1.3"
        div.style["margin-bottom"] = "18px"
        div.innerText = "The graphics in this article work on the app, but for a more interactive experience click "
        div.append(link)
        node.prepend(div)
    }
}

export default Base
