import "./base.less";

class Base {
  constructor(selector, html) {
    this.root = { selector, node: window.document.querySelector(selector) };
    if (!this.root.node)
      console.error(
        "Cannot find element '" + selector + "'! Nothing will work!"
      );
    // // this.fadeOut()
    // // this.root.node.innerText = "Hello, Goodbye";
    if (!window.hasOwnProperty('ReactNativeWebView')) {
      const pbFeature = this.root.node.closest(".pb-feature");
      pbFeature && pbFeature.classList.add("pb-f-article-slideshow"); // Herald site hack - hijack swipe on this visualisation
    }
  }

  premiumWait(render) {
    // Inside premium container - wait for premium container to come down
    const el = document.querySelector("#article-content");
    if (el && el.classList.contains("premium-content")) {
      console.log("Waiting for paywall to come down.");
      const observer = new MutationObserver((mutations) => {
        if (el.classList.contains("full-content")) {
          render();
          console.log("Rendering done.");
          observer.disconnect();
        }
      });
      observer.observe(el, { attributes: true });
    }
    // Normal deployment - go when ready
    else {
      console.log("No paywall detected.");
      render()
      console.log("Rendering done.");
    }
  }

  // fadeOut(b) {
  //   const el = this.root.node.querySelector(".loading");
  //   console.log(el)
  //   if (el) {
  //     el.classList.add("remove");
  //     setTimeout(() => {
  //       el.remove();
  //       if (b) b();
  //     }, 1000);
  //   }
  // }
}

export default Base;
