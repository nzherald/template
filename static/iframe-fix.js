// iFrame widths are set to 100% by the Herald stylesheet, this doesn't work on Safari on iOS because reasons
// The fix is to setting a base width + max-width of 100%, we can't edit the stylesheet directly, so do this via JS
// Be sure to a) include data-pym-fix="insights" in the main div, and b)
//
// <div data-pym-fix="insights" data-pym-src="https://insights.nzherald.co.nz/[app path]">Loading...</div>
// <script type="text/javascript" src="https://pym.nprapps.org/pym.v1.min.js"></script>
// <script type="text/javascript" src="https://insights.nzherald.co.nz/[app path]/iframe-fix.js"></script>

document.querySelector('div[data-pym-fix="insights"] iframe').style['width']="320px"
document.querySelector('div[data-pym-fix="insights"] iframe').style['max-width']="100%"
