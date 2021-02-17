// Chris' code, I'm not sure how this is supposed to work
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
