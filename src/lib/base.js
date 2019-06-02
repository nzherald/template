import $ from "jquery"
import "./base.less"


class Base {
    constructor (html) {
        const root = document.currentScript.getAttribute("data-targ") || "#nzh-datavis-root"
        this.root = {
            selector: root,
            $: $(root)
        }
        this.root.$.append(html)
        this.basePath = window.__insights_nzherald_co_nz__basePath
    }

    premiumWait (render) {
        // Inside premium container - wait for premium container to come down
        const el = $("#article-content")
        if (el.hasClass("premium-content")) {
            const observer = new MutationObserver(mutations => {
                if (el.hasClass("full-content")) {
                    render()
                    console.log("Rendering done.")
                    observer.disconnect()
                }
            })
            observer.observe(el[0], {attributes: true})
        }
        // Normal deployment - go when ready
        else {
            this.root.$.ready(() => {
                render()
                console.log("Rendering done.")
            })
        }
    }

    fadeOut (b) {
        sessionStorage.setItem("loading", "done")
        const el = this.root.$.find("#loading")
        el.fadeTo(600, 0.01, () => {
            el.remove()
            console.log("Loading screen removed.")
            if (b) b()
        })
    }
}

export default Base