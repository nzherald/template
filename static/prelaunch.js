(function () {
    var el = document.getElementsByClassName("nzh-datavis");
    var isIE = navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/rv:11/));
    if (isIE) {
        if (el) {
            el.innerHTML = '<b>Sorry! Your browser does not support the rating tool.</b> <p>Please try <a href="https://www.microsoft.com/en-nz/windows/microsoft-edge" target="_blank">Microsoft Edge</a>, <a href="https://www.google.com/chrome/" _target="_blank">Google Chrome</a> or <a href="https://www.mozilla.org/en-US/firefox/new/" _target="_blank">Mozilla Firefox</a>.</p>'
        }
        return;
    };
    for (var i = 0; i < el.length; i++) {
        el[i].innerHTML = '<div class="loading"><div class="message"><div class="text">Loading...</div><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div></div>'
    }
    console.log('prelaunch.js finished.');
})()
