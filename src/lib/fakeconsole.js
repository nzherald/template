import "./fakeconsole.less"

function addRow (msg, parent, classes) {
    var row = document.createElement("div")
    row.setAttribute("class", classes.join(" "))
    if (msg) row.innerHTML = msg.join(" ")
    parent.appendChild(row)
}

function replaceConsole (k, parent) {
    console["__" + k] = console[k]
    console[k] = (...msg) => {
        console["__" + k](...msg)
        addRow(msg, parent, [k])
    }
}

// Redirect to fake console
function setFakeConsole (node) {
    var el = document.createElement("div")
    el.setAttribute("id", "console")
    node.insertBefore(el, node.childNodes[0])
    for (var k of ["log", "error", "warn", "info"]) { // Debug is deliberately left out
        replaceConsole(k, el)
    }
}

export default setFakeConsole
