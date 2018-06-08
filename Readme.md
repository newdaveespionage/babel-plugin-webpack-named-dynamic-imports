## babel-plugin-webpack-named-dynamic-imports [![Build Status][1]][2]

[1]: https://travis-ci.org/newdaveespionage/babel-plugin-add-named-dynamic-import-comments.svg?branch=master
[2]: https://travis-ci.org/newdaveespionage/babel-plugin-add-named-dynamic-import-comments

A babel plugin which allows for `webpack@4+` dynamic imports being named based on your own object names.

### Usage

Install the package:

```bash
npm i babel-plugin-webpack-named-dynamic-imports --save
```

And enable it in a babel config:

```js
{
    "plugins": [
        "webpack-named-dynamic-imports"
    ]
}
```

Now you can use the following syntax to dynamically import modules:

```js
// unnamed chunk w/ exactly 1 module
import('./a.js').then(({default: A}) => {});

```

The code above will be transpiled to the following:

```js
import( /* webpackChunkName: "A" */ './a.js').then(({ default: A }) => {});

```
