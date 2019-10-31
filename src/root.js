import Base from "./lib/base.js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./root.less";

class Main extends Base {
  constructor() {
    console.log("Setting up visualisation...");
    super();
    this.premiumWait(() => {
      console.log("Rendering...");

      this.visnodes.map(node => {
        ReactDOM.render(<App basePath={this.basePath} {...node.params} />, node.selector);
      })
      console.log("Done.");
      this.fadeOut();
    });
  }
}

new Main();
