module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="https://insights.nzherald.co.nz/apps/2020/auckland-noise/",n(n.s=2)}([function(e,t){e.exports=require("svelte/internal")},function(e,t){e.exports=require("svelte/store")},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(1),s=Object(o.writable)(null,void 0);const i={code:"svg.svelte-10cipyo.svelte-10cipyo{height:200px;width:300px}svg.svelte-10cipyo rect.svelte-10cipyo{fill:#4049a2}",map:'{"version":3,"file":"Nested.svelte","sources":["Nested.svelte"],"sourcesContent":["<style lang=\\"less\\">svg {\\n  height: 200px;\\n  width: 300px;\\n}\\nsvg rect {\\n  fill: #4049a2;\\n}\\n</style>\\n\\n<div class=\\"header\\">\\n  <p>This is another paragraph.</p>\\n</div>\\n<svg viewBox=\\"0 0 100 100\\">\\n  <rect x=\\"25\\" y=\\"25\\" width=\\"50\\" height=\\"50\\" />\\n</svg>\\n"],"names":[],"mappings":"AAAmB,GAAG,8BAAC,CAAC,AACtB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,AACd,CAAC,AACD,kBAAG,CAAC,IAAI,eAAC,CAAC,AACR,IAAI,CAAE,OAAO,AACf,CAAC"}'};var c=Object(r.create_ssr_component)((e,t,n,r)=>(e.css.add(i),'<div class="header"><p>This is another paragraph.</p></div>\n<svg viewBox="0 0 100 100" class="svelte-10cipyo"><rect x="25" y="25" width="50" height="50" class="svelte-10cipyo"></rect></svg>'));const l=Object(r.create_ssr_component)((e,t,n,o)=>{let i=Object(r.get_store_value)(s);var{component:l="default"}=t;return void 0===t.component&&n.component&&void 0!==l&&n.component(l),i=void 0,`<div>${""+Object(r.validate_component)(c,"Nested").$$render(e,{},{},{})}</div>`});t.default=l}]);