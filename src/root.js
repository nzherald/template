import Base from "./lib/base.js"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./root.less"


class Main extends Base {
    constructor (selector, params) {
        console.log("Setting up visualisation with parameters:", params)
        super(selector, HTML)
        console.log("Loading data...")
        null
        this.premiumWait(() => {
            console.log("Rendering...")
            this.visnodes.map(node => {
                ReactDOM.render(
                  <App {...node.params} />,
                  node.selector
                );
              }); 
            console.log("Done.")
            this.fadeOut()
        })
    }
}

window.Main = window.UniqClassName = Main
