# Template
Basic template for setting up a new story


### Installation
Webpack dev server should be ready to go as soon as packages are installed.
```
npm install
npm start
```


### Run modes
```
npm run [option]
```
**start**: Runs dev server with barebone template
**dev-thick**: Runs dev server with nzherald.co.nz template
**build**: Builds bundle files locally but does not deploy
**analyse**: Builds and runs bundle-analysis tools
**deploy**: Builds and pushes bundle files to http://s3.newsapps.nz/dev/[project name]/
**release**: Builds and pushes bundle files to homepage specified in package.json


### Insight component
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
<script src='//localhost:8080/bundle.js'></script>
```

4. When ready, link index.md to live resources.
```
<div id='root'></div>
<link rel='stylesheet' href='http://s3.newsapps.nz/[project name]/root.css' />
<script src='http://s3.newsapps.nz/[project name]/root.bundle.js'></script>
```

5. Publish
```
insights publish dev
```


## Todo
Source mapping (https://webpack.js.org/guides/production/#source-mapping)
