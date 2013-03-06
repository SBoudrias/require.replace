/*!
 * require.replace.js
 * https://github.com/SBoudrias/require.replace
 *
 * Copyright (c) 2013, Simon Boudrias
 * Licensed under the MIT license.
 */
(function () {
	'use strict';

	var aIndexOf = Array.prototype.indexOf || function( needle ) {
		for(var i = 0; i < this.length; i++) {
			if( this[i] === needle ) {
				return i;
			}
		}
		return -1;
	};
	
	define({
		version: '0.2.0',
		
		// ---
		// Called when a dependency needs to be loaded.
		
		load: function (name, req, onLoad, config) {
			
			if( !config.config.replace ) {
				throw new Error('Require.replace need to be configured');
			}
			
			var replaceConfig = config.config.replace,
				moduleConfig  = replaceConfig[name] || replaceConfig,
				toLoad = [],
				shouldRun = config.isBuild ? moduleConfig.optimize : true,
				pattern, value, path;

			(function() {
				
				// Skip if we're in build process and config.optimize is set to false
				if ( !shouldRun ) return;

				pattern = moduleConfig.pattern;
				value   = moduleConfig.value();

				// skip if the `value` is contained in the ignored value list
				if( moduleConfig.ignore
						&& aIndexOf.call( moduleConfig.ignore, value ) >= 0 ) return;

				// If there's a `paths` config, use it
				if ( config.paths[name] ) {

					// @note: This override the defined path config to work with shimmed
					//        modules.
					config.paths[name] = config.paths[name].replace( pattern, value );

					toLoad.push( name );
					
				// else, the name is a path
				} else {
					
					path = name.replace( pattern, value );
					toLoad.push( path );
					
				}
				
			}());

			req(toLoad, function ( value ) {
				onLoad( value );
			});
		}
	});
}());
