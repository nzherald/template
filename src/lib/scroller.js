/*

Scroller: Wrapper for Scrollama

Expected HTML:
<div class="scroll-container">
    <div class="scroll-graphic">
        <div class="mainvis">
            <svg></svg>
        </div>
    </div>
    <div class="scroll-text">
        <div>
            <p>First step: no need to add any Scrollama classes</p>
        </div>
        <div>
            <p>Second step: Scroller will turn these into inner divs and wrap them in a step div</p>
        </div>
    </div>
</div>

Usage:
new Scroller({
    container: ".scroll-container",
    offset: 0.65
}, (e, hist) => {
    switch (e.index) {
        case 0:
            console.log("Frame 1 has been triggered")
            break
        case 1:
            console.log("Frame 2 has been triggered")
            break
        default:
            console.log("Waaat")
    }
})

*/

import _ from "lodash"
import $ from "jquery"

import "intersection-observer"
import Scrollama from "scrollama"
import Stickyfill from "stickyfilljs"

import "./scroller.less"

class Scroller extends Scrollama {
    constructor (opt, action) {
        super()
        this.$ = $(opt.container)
        this.text = this.$.find(".scroll-text")
        this.graphic = this.$.find(".scroll-graphic")
        if (!this.text.length) throw "Scroller: Cannot find .scroll-text element!"
        if (!this.graphic.length) throw "Scroller: Cannot find .scroll-graphic element!"
        if (!this.graphic.height()) throw "Scroller: .scroll-graphic has no height (has the element been rendered?)!"
        this.$.addClass("scroll-container")

        this.text.children().addClass("inner").wrap("<div class='step'/>") // Wrap text in .step/.inner
        Stickyfill.add(this.graphic) // Polyfill sticky

        this.setup(_.extend({
            step: ".scroll-text .step",
            offset: 0.65
        }, opt))

        // Align text with container
        this.text.css("margin-top", -this.text.position().top)

        // Set script
        this.onStepEnter((e, hist) => {
            $(e.element).toggleClass("highlighted", true)
                        .siblings().toggleClass("highlighted", false)
            if (action) action(e, hist)
        })
        this.onStepExit((e, hist) => {
            if (action) action(e, hist)
        })

        // Always resize on resize
        $(window).on("resize", () => this.resize())
    }
}

export default Scroller
