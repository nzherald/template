import Base from "./lib/base.js"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./root.less"


class Main extends Base {
    constructor () {
        console.log("Setting up visualisation...")
        super()
        const app = document.getElementById("nzh-datavis-root")
        this.premiumWait(() => {
            console.log("Rendering...")
            ReactDOM.render(<App basePath={this.basePath}/>, app)
            console.log("Done.")
            this.fadeOut()
        })
    }
}

new Main()
