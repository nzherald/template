# Template
Basic template for setting up a new story

## Setup a new project

- Install `degit` once

```
npm install -g degit
```

There are several branches in this project that contain similar versions the
template with for different frameworks

### Minimal template

`degit nzherald/template`

### Batteries included template

This template pulls in d3, d3-jetpack, jquery & lodash. It uses a class
based template for components.

`degit nzherald/template#batteries-included`

### Svelte template

`degit nzherald/template#svelte`


## Installation
Webpack dev server should be ready to go as soon as packages are installed.
```
npm install
npm start
```


## Run modes
```
npm run [option]
```
**start**: Runs dev server with barebone template; thick templates are available on /thick.html and /iframe.html
**build**: Builds bundle files locally but does not deploy
**analyse**: Builds and runs bundle-analysis tools
**deploy**: Builds and pushes bundle files to http://s3.newsapps.nz/dev/[project name]/
**release**: Builds and pushes bundle files to homepage specified in package.json


## Insight component
1. Create a new branch
```
git pull
git checkout -b article/[project name]
git push --set-upstream origin article/[project name]
```

2. Create a new article
```
insights new
```

3. Link index.md to build files
```
<div id='root'></div>
<script src='//localhost:8080/embed.js'></script>
```

4. When ready, link index.md to live resources.
```
<link rel='stylesheet' href='https://insights.nzherald.co.nz/apps/2018/[project name]/embed.css' />
<div id='root'></div>
<script src='https://insights.nzherald.co.nz/apps/2018/[project name]/embed.js'></script>
```

5. Publish
```
insights publish dev
```


## Todo
Source mapping (https://webpack.js.org/guides/production/#source-mapping)
