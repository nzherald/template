

export const setupScrolly = (params) => {
    const articleNodes = Array.from(document.getElementById("article-content").children) // Not on App or IE
    const build = (scrollyState, current) => {
        if (current.nodeName === "DIV" && current.className.match(/element-rawhtml/)) {
            scrollyState.nodes.unshift({graphicNode: current, paragraphs: [], pars: scrollyState.pars.shift()})
            current.classList.add("sticky-graphic")

        }

        if (scrollyState.nodes.length > 0 && current.nodeName === "P") {
            scrollyState.nodes[0].paragraphs.push(current)
        }
        return scrollyState
    }
    const articleState = articleNodes.reduce(build, {nodes: [], pars: params}).nodes.reverse()

    const observe = (state, index, cb) => {
        const elemHeight = state.graphicNode.getClientRects()[0].height
        let options = {
            rootMargin: `-405px 0px 0px 0px`, //${window.innerHeight - state.graphicNode.getClientRects()[0].height}px 0px`,
            threshold: [0.2, 0.8]
        }
        let callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (cb && entry.intersectionRatio >= 0.8) {
                        cb({graphic: index, par: entry.target.dataset["index"]})
                    }
                    state.graphicNode.classList.remove("graphic-defocus")
                }
                if (entry.target.dataset["last"] && !entry.isIntersecting && entry.intersectionRatio <= 0.2 && entry.boundingClientRect.top < 405) {
                    state.graphicNode.classList.add("graphic-defocus")
                }
            });
        };
        let observer = new IntersectionObserver(callback, options);
        state.paragraphs.slice(0, state.pars).map((d,i) => {
            d.dataset["index"] = i
            if (i === 0) {
                d.dataset["first"] = "first"
            }
            if (i === state.pars - 1) {
                d.dataset["last"] = "last"
            }
            observer.observe(d)
        })
        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0].contentRect.height !== elemHeight) {
                observe(state)
            }
        })
        resizeObserver.observe(state.graphicNode)

    }
    articleState.map((d,i) => observe(d, i, nzhconsole))
}



export const nzhconsole = console.originalConsole ? console.originalConsole.log : console.log

export const appWarn = (selector, zenid, category) => {
    if (window.hasOwnProperty('ReactNativeWebView')) {
        const node = document.querySelector(selector)
        const link = document.createElement("a")
        link.setAttribute("_target", "blank")
        link.setAttribute("href", `https://www.nzherald.co.nz/${category || "nz"}/news/article.cfm?&objectid=${zenid}`)
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


