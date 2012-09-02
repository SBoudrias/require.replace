# Require.js replace! plugin

[![Build Status](https://secure.travis-ci.org/SBoudrias/require.replace.png)](http://travis-ci.org/SBoudrias/require.replace])

The `replace!` plugin is used to replace a `pattern` with a `value` in a module path before it's loaded.

A basic usage could be to work with third party services' localized scripts (like Facebook js SDK).

`replace!` have been tested under [require.js](https://github.com/jrburke/requirejs) [v2.0.2](https://github.com/jrburke/requirejs/tree/2.0.2).

## Download

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/SBoudrias/require.replace/master/dist/require.replace.min.js
[max]: https://raw.github.com/SBoudrias/require.replace/master/dist/require.replace.js

## Basic settings

`replace!` take a config object where you set the `pattern` and a function returning a `value`.

```javascript
require.config({
	config: {
		replace: {
			pattern : 'NLS',
			value   : function() {
				return "fr_CA";
			}
		}
	},
	paths: {
		facebook: "//connect.facebook.net/NLS/all.js"
	}
});

require(["replace!facebook"]);

// Will load: //connect.facebook.net/fr_CA/all.js
```

You can also set specific `pattern` and `value` options for each module.

```javascript
require.config({
	config: {
		replace: {
			facebook: {
				pattern : 'NLS',
				value   : function() {
					return "fr_CA";
				}
			}
		}
	},
	paths: {
		facebook: "//connect.facebook.net/NLS/all.js"
	}
});
```

### Real use example settings

**index.html**
```html
<script type="text/javascript">
	window.appData = {
		user: {
			locale: "fr_CA"
		}
	}
</script>
```

**config.js**
```javascript
require.config({
	config: {
		replace: {
			facebook: {
				pattern : 'NLS',
				value   : function() {
					return window.appData.user.locale;
				}
			}
		}
	},
	paths: {
		facebook: "//connect.facebook.net/NLS/all.js"
	}
});
```

## Settings

**pattern** : Can be any string or RegExp. The `pattern` will be used inside javascript `replace()` function.

**value**   : Must be a `function` returning a `string` (or a `variable` referencing a string). This param need to be a function so it will also work when passing through the `r.js` optimizer.

## Optimisation (`r.js`)

Modules called with `replace!` will be automatically excluded (ignored) from build for logical reason.

## Contributing
Try to follow [idiomatic.js style guidelines](https://github.com/rwldrn/idiomatic.js/) in your commits. Add unit tests for any new or changed functionality. Lint and test your code using [grunt-bbb](https://github.com/backbone-boilerplate/grunt-bbb) (has built-in jasmine unit test support).

## Release History
06/07/2012 - v0.1.0 - First release

## License
Copyright (c) 2012 Simon Boudrias  
Licensed under the MIT license.
