# ⏰ [WIP] Laravel Nova Component Watcher

As many of you may be aware, each custom nova component has it's own node environment.

This can be lovely if you're producing components to share and never touch again.

However it can be a massive pain if you're actively developing a application and reguarlly changing components to fulfil your requirements.

This package simply adds a function to your `webpack.mix.js` and autoloads in your components so you can use live building etc from a single root watch process.

# Install and configuration

To install simply `npm i nova-watcher` to your root package.json

Then import the library, and attach it to your mix instance e.g

```js

const mix = require('mix');
const novaWatcher = require('nova-watcher');

/*
* All your mix stuff here.
*/

new novaWatcher(mix); // Create a new instance of nova-watcher and bind your mix instance.

```

# Notes

The webpack mix config it uses is the vanilla laravel-nova config as below

```js
.mix
.js('/js/field.js', 'dist/js')
.sass('/sass/field.scss', 'dist/css')
.webpackConfig({
    resolve: {
        symlinks: false
    }
});
```

If you need more advance ones, feel free to modify the code as much as you want.
