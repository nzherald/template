import $ from "jquery"
import "./base.less"


class Base {
    constructor (selector, html) {
        this.root = {selector, $: $(selector)}
        if (!this.root.$[0]) console.error("Cannot find element '" + selector + "'! Nothing will work!")
        this.root.$.html(html)
        this.root.$.addClass("nzh-datavis")
        this.root.$.closest(".pb-feature").addClass("pb-f-article-slideshow") // Herald site hack - hijack swipe on this visualisation
    }

    premiumWait (render) {
        // Inside premium container - wait for premium container to come down
        const el = $("#article-content")
        if (el.hasClass("premium-content")) {
            console.log("Waiting for paywall to come down.")
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
            console.log("No paywall detected.")
            this.root.$.ready(() => {
                render()
                console.log("Rendering done.")
            })
        }
    }

    fadeOut (b) {
        const el = this.root.$.find(".loading")
        el.fadeTo(600, 0.01, () => {
            el.remove()
            console.log("Loading screen removed.")
            if (b) b()
        })
    }
}

export default Base
