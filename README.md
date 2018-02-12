# Template
Basic template for setting up a new story


### Installation
Webpack dev server should be ready to go as soon as packages are installed.
```
npm install
npm start
```

### Deploy
Push JS/CSS files to S3 bucket. Folders are automatically assigned and created based on project name.

```
npm run deploy
```

This gets you to having live resources (e.g. http://s3.newsapps.nz/[project name]/root.bundle.js), but **does NOT update Insights itself**.

**IMPORTANT: These are HTTP, not HTTPS links.**


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
How does versioning/hash filenames work?
Source mapping (https://webpack.js.org/guides/production/#source-mapping)
