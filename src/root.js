import Base from "./lib/base.js"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./root.less"


class Main extends Base {
    constructor (selector, params) {
        console.log("Setting up visualisation with parameters:", params)
        super(selector)
        console.log("Loading data...")
        null
        console.log(selector)
        this.premiumWait(() => {
            console.log("Rendering...")
            ReactDOM.render( <App {...params} />, document.querySelector(selector));
            console.log("Done.")
            this.fadeOut()
        })
    }
}

window.Main = window.UniqClassName = Main
