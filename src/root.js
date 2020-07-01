import React from "react";
import { render } from "react-dom";
import ENV from "Environment";
import Base from "./lib/base.js";
// import { nzhconsole, setupScrolly, appWarn } from "./lib/util.js"

import "./root.less";

const appChartHeight = (chart) => {
  if (!window.hasOwnProperty("ReactNativeWebView")) {
    return "auto";
  }
  switch (chart) {
    case "duration":
      return 350;
    case "offence":
      return 510;
    case "delta":
      return 220;
    default:
      return 200;
  }
};

class Main extends Base {
  constructor(selector, params) {
    console.log("Setting up visualisation with parameters:", params);
    super(selector);
    // $(selector).text("yo")
    this.premiumWait(async () => {
      console.log("Rendering...");
      const { default: App } = await import("./app");
      const { node } = this.root;
      render(
        <App
          {...params}
          minHeight={appChartHeight(params.chart)}
          initialWidth={node.clientWidth || 620}
        />,
        node
      );
      console.log("Done.");
      // this.fadeOut()
      // if (params.setupScrolly) {
      //     const scrolly = setupScrolly(params.setupScrolly)
      // }
      // if (params.appWarn) {
      //     appWarn(this.root.selector, params.appWarn, params.category)
      // }
    });
  }
}

window.Main = window.UniqClassName = Main;

// careful with this ....
// wondoer if it should be protected e.g.
// if zen window.onload.nzh_datavis = true then wrap this in
// if (window.onload.nzh_datavis) { /** */ } ??
// window.onload()
// window.onload = null
