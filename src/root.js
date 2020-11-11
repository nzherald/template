import ENV from "Environment"
import Base from './lib/base.js'
import HTML from './root.html'
import './root.less'

class Main extends Base {
  constructor(selector, params) {
    console.log('Setting up visualisation with parameters:', params)
    super(selector, HTML)
    console.log('Loading data...')
    this.premiumWait(async () => {
      const { default: App } = await import('./App.svelte')
      console.log('Rendering...')
      new App({
        target: this.root.node,
        hydrate: true,
        props: {...params, inapp: !window.hasOwnProperty('ReactNativeWebView')},
      })
      console.log('Done.')
    })
  }
}

window.DataVisDevMain = window[ENV.name] = Main
