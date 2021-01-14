(function () {
    var el = document.getElementsByClassName("nzh-datavis");
    if (typeof Promise == "undefined") {
        for (var i = 0; i < el.length; i++) {
            el[i].innerHTML = '<b>Sorry! Your browser does not support this interactive.</b> <p>Please try <a href="https://www.microsoft.com/en-nz/windows/microsoft-edge" target="_blank">Microsoft Edge</a>, <a href="https://www.google.com/chrome/" _target="_blank">Google Chrome</a> or <a href="https://www.mozilla.org/en-US/firefox/new/" _target="_blank">Mozilla Firefox</a>.</p>';
        }
        return;
    };
    if (document.getElementById("rnahw-wrapper")) {
        console.log("Removing custom app styles..");
        const styles = document.head.getElementsByTagName("style");
        for (let i = 0; i < styles.length; i++) {
            styles[i].innerHTML = styles[i].innerHTML.replace(/\* \{[\s\S]*?\}/, "");
        };
    };
    console.log('prelaunch.js finished.');
})();
