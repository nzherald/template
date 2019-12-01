import { parse } from "query-string";

import "./base.less"
import ENV from 'Environment';

if (!Object.entries) {
    Object.entries = function(obj) {
      var ownProps = Object.keys(obj),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
      while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
  
      return resArray;
    };
  }

class Base {
    constructor (html) {
        this.visnodes = [...document.getElementsByClassName("nzh-datavis")].map(
            n => {
               $(n).append(html)
                return {
                    selector: n, 
                    params: n.attributes["data-params"] ? parse(n.attributes["data-params"].value) : {},
                    $: $(n)
                }
              }
          );
          this.root = this.visnodes[0]
          this.basePath =
            ENV.isProduction &&
            ENV.separateCrossOriginRequests &&
            ENV.basePath.includes(location.host)
              ? ENV.localPath
              : ENV.basePath;
    }

  premiumWait(render) {
    // Inside premium container - wait for premium container to come down
    const el = $("#article-content");
    if (el.hasClass("premium-content")) {
      console.log("Waiting for paywall to come down.");
      const observer = new MutationObserver(mutations => {
        if (el.hasClass("full-content")) {
          render();
          console.log("Rendering done.");
          observer.disconnect();
        }
      });
      observer.observe(el[0], { attributes: true });
    }
    // Normal deployment - go when ready
    else {
      console.log("No paywall detected.");
      
      this.visnodes[0].$.ready(() => {
        render();
        console.log("Rendering done.");
      });
    }
  }

  fadeOut(b) {
    sessionStorage.setItem("loading", "done");
    const el = this.visnodes[0].$.find(".loading");
    el.fadeTo(600, 0.01, () => {
      el.remove();
      console.log("Loading screen removed.");
      if (b) b();
    });
  }
}

export default Base;
