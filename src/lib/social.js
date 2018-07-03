import $ from "jquery"

import "./social.less"
require("font-awesome-webpack")

class Social {
    // Expected options: container, path, text (optional)
    constructor (options) {
        this.$ = $("<div/>", { class : "social-container" })
        this.$.appendTo(options.container)

        $("<div>", { class : "label", text : "Share this story" }).appendTo(this.$)

        const url   = encodeURIComponent(options.path),
              icons = $("<div>", { class : "icons" })
        icons.append(this.facebookButton(url, options.text))
        icons.append(this.twitterButton(url, options.text))
        icons.appendTo(this.$)
    }

    // Facebook shares no longer allow prefilled text
    facebookButton (url) {
        return $("<a>", {
            class : "fa fa-facebook",
            href  : "https://www.facebook.com/sharer/sharer.php?u=" + url
        })
    }
    twitterButton (url, text) {
        return $("<a>", {
            class : "fa fa-twitter",
            href  : "https://twitter.com/intent/tweet?url=" + url + "&text=" + text
        })
    }
}

export default Social
