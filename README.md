# Template
Basic template for setting up a new story

## Setup a new project
`npm install -g degit`

There are several branches in this project that contain similar versions of the
template with for different frameworks.

### Minimal template
`degit nzherald/template`

### Batteries included template
This template pulls in d3, d3-jetpack, jquery & lodash. It contains a big bag of components which you can pick and choose from.

`degit nzherald/template#batteries-included`

### ObservableHQ template
`degit nzherald/template#observable`


## Installation
Webpack dev server should be ready to go as soon as packages are installed.
```
npm install
npm start
```


## Run modes
`npm run [option]`
`start`: Runs dev server with barebone template

`analyse`: Builds and runs bundle-analysis tools

`release`: Builds and pushes bundle files to homepage specified in package.json - embed details will be in `dist/zen.txt`

`livetest`: Builds and pushes bundle files to https://insights.nzherald.co.nz/app/livetest, which can be viewed at https://www.nzherald.co.nz/business/news/article.cfm?c_id=3&objectid=12234834

`homepagebanner`: Pushes straight to https://insights.nzherald.co.nz/apps/homepagebanner/ and overwrites existing banner. Obviously dangerous and disabled by default.

## Embedding in an article
To embed an interactive within an article it is necessary to insert:

`<div class='nzh-datavis' id='nzh-datavis-root'></div>`

The id can be varied - the class needs to always be `nzh-datavis`.

The `dist/zen.txt` will contain embed links for `embed.css`, `prelaunch_v2.js`, and `embed.js`.
These should be placed in the article's _raw footer_ and they only need to be included once.

The actual interactive is initiated with:

```
<link href="https://insights.nzherald.co.nz/apps/projectname/embed.css" rel="stylesheet">
<script defer src="https://insights.nzherald.co.nz/apps/projectname/prelaunch_v2.js"></script>
<script defer src="https://insights.nzherald.co.nz/apps/projectname/embed.js"></script>
<script>
    window.addEventListener("load", function () {
        new window["projectname"]("#nzh-datavis-root");
    })
</script>
```

Make sure that the id matches the id of the div inserted into the article.


### Embedding multiple instances of the same visualisation
Each instance needs to have a different element:

```
    <div class='nzh-datavis' id='nzh-datavis-a'></div>
    <div class='nzh-datavis' id='nzh-datavis-b'></div>
```

Then run the visualisation once for each instance, pointing to the right element, with
the parameters specific to that instance.

```
<link href="https://insights.nzherald.co.nz/apps/projectname/embed.css" rel="stylesheet">
<script defer src="https://insights.nzherald.co.nz/apps/projectname/prelaunch_v2.js"></script>
<script defer src="https://insights.nzherald.co.nz/apps/projectname/embed.js"></script>
<script>
    window.addEventListener("load", function () {
        new window["projectname"]("#nzh-datavis-a", { region: "Auckland" });
        new window["projectname"]("#nzh-datavis-b", { region: "Wellington" });
    })
</script>
```

The same method can be used to run instances of different visualisations. Note that
prelaunch_v2.js only needs to be run once. Each project is expected to store its constructor
in window. (Is there a better way to expose the project?)

```
<link href="https://insights.nzherald.co.nz/apps/projectname/embed.css" rel="stylesheet">
<link href="https://insights.nzherald.co.nz/apps/otherproject/embed.css" rel="stylesheet">
<script defer src="https://insights.nzherald.co.nz/apps/projectname/prelaunch_v2.js"></script>
<script defer src="https://insights.nzherald.co.nz/apps/projectname/embed.js"></script>
<script defer src="https://insights.nzherald.co.nz/apps/otherproject/embed.js"></script>
<script>
    window.addEventListener("load", function () {
        new window["projectname"]("#nzh-datavis-a");
        new window["otherproject"]("#nzh-datavis-b");
    })
</script>
```


### Fallback in the app
In the NZH mobile app interactives run within their own ReactNativeWebView - this means that some of
the features we like to use - primarily stick positioning - are unavailable.

To include a prompt to redirect to an actual browser window use the `zenId` argument:

`new window["projectname"]("#nzh-datavis-root", { zenId: 12234834 })`

where the argument is the Zen ID of the article - this will generate a url within the "New Zealand"
section of the Herald, include a `category` argument if you want another vertical e.g.

`new window["projectname"]("#nzh-datavis-root", { zenId: 12234834, category: "business" })`


### Defunct features

These have been put into the `batteries-included` branch.

#### `nzhconsole`
Within the Herald site `console.log` is redirected to an array of strings that can be viewed at
`console.messages` - this is generally fine for checking an interactive has rendered. But because
the messages are strings it is sometime insufficient for resolving problems - especially if those
problems require viewing an object. The function `nzhconsole` logs its arguments to the console
regardless of where the code is running.


#### `setupScrolly`
_Scrolly-telling_ is a common way of making visualisations more accessible to readers. This
function provides easy integration of a basic scrolly-telling approach with an article. A full-blown
scrolly-telling article would require further customisation or a different approach.

This scrolly telling approach just grabs each embedded interactive element and makes it sticky for
the specified number of paragraphs. There is also the option to pass a callback which will be called
whenever a given paragraph is focussed. The `elm` branch includes a working example of using this
callback in `root.js` - the callback code is all JS not Elm.

```
<script>
    window.addEventListener("load", function () {
        new window["projectname"]("#nzh-datavis-a", { chart: "māori", setupScrolly: [4, 2] });
    })
</script>
```

To use this pass the `setupScrolly` argument to the last embed - the additional parameters are just
a list of the number of paragraphs that the graphic should be sticky for - so in this case
4 paragraphs after the first graphic and 2 after the second.
