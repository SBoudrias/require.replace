RequireJS `replace!` plugin [![Build Status](https://secure.travis-ci.org/SBoudrias/require.replace.png)](http://travis-ci.org/SBoudrias/require.replace)
============================================

The `replace!` plugin is used to replace a `pattern` by a `value` in a module path before
it's loaded.

The **main usage is to load localized (i18n) scripts** for any dependencie you use (like `jQuery.Validation` or `Moment.js`) or third party localized SDKs (like the Facebook JS SDK).

`replace!` has been tested with the [require.js](https://github.com/jrburke/requirejs) v2.1.* series.

Basic settings
------------------------------------------
`replace!` takes a config object where you set the `pattern` to be replaced by the `value`.

```javascript
require.config({
	config: {
		replace: {
			pattern : "NLS",
			value   : "fr_CA"
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
				value   : "fr_CA"
			},
			moment: {
				pattern : 'NLS',
				value   : "fr_CA"
			}
		}
	},
	paths: {
		facebook: "//connect.facebook.net/NLS/all.js",
		moment: "components/NLS/moment.js"
	}
});
```

### Ignoring a value

Localized plugins like `jQuery.Validation` or `Moment.js` comes with built-in locales and
extra locales in separate files. To ease built-in locales declaration, you can setup
`replace!` to ignore speficied locales for a module.

```Javascript
var locale;
require.config({
	config: {
		replace: {
			pattern: "nls",
			value: function() {
				return locale;
			},
			ignore: [ "en_US" ]
		}
	}
});

locale = "fr_CA";
require(["replace!nls/locale.js"]);
// Will load `fr_CA/locale.js`

locale = "en_US";
require(["replace!nls/locale.js"], function( ref ) { /**/ });
// Won't load any module, and will pass `undefined` as `ref` value.
```


Settings
------------------------------------
**pattern** _required_ : Can be any `String` or `RegExp`. _The `pattern` will be used
inside javascript `String.replace()` function._

**value**   _required_ : May be a `String` or a `Function` returning a `String` (or a
variable referencing a string). Adding the value as a `Function` may protect the build from
failing if an unreachable object is used as value.

**ignore** : an `Array` containing each locale to ignore when requested.


Real use example settings
------------------------------------

```html
<!-- index.html -->
<script type="text/javascript">
	window.appData = {
		user: {
			locale: "fr_CA"
		}
	}
</script>
```

```javascript
// config.js
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


Optimisation (`r.js`)
------------------------------------

By default, modules required via `replace!` will be ignored during the build process.

To include module in the build, you need to set the `optimize` option to `true`.

```javascript
requirejs.optimize({
	replace: {
		pattern: "NLS",
		value: "fr_CA",
		optimize: true
	}
});
```

Make sure to checkout the `test/mocha/node.js` file for an optimisation example.

_(This setting will work with different RequireJS building tools; e.g. grunt-contrib-requirejs, etc)_


Contributing
------------------------------------
Please follow [idiomatic.js style guidelines](https://github.com/rwldrn/idiomatic.js/) in
your commits. Add unit tests for any new or changed functionality. Lint and test your code
using [grunt](https://github.com/cowboy/grunt).


Release History
------------------------------------
12/03/2013 - v0.3.0 - Add support build system and ignored values    
24/09/2012 - v0.2.0 - Add support for named inlined module  
06/07/2012 - v0.1.0 - First release  


License
------------------------------------
Copyright (c) 2012 Simon Boudrias  
Licensed under the MIT license.
