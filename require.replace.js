/*
 * require.replace
 * https://github.com/SBoudrias/require.replace
 *
 * Copyright (c) 2012 Simon Boudrias
 * Licensed under the MIT license.
 */
/*global require: false, navigator: false, define: false, console: true */

(function () {
    'use strict';
	
    define(['module'], function (module) {
        var masterConfig = module.config();
		
        return {
			
            version: '0.1.0',
			
			
            /**
             * Called when a dependency needs to be loaded.
             */
			
            load: function (name, req, onLoad, config) {
				
				var moduleConfig = masterConfig[name] || masterConfig,
					toLoad = [],
					pattern, value, path;
				
                if ( !config.isBuild ) {
					
                    // Ignore if we're in a build process, this plugin is
					// only used for condtionnal loading
					
					pattern = moduleConfig.pattern;
					value   = moduleConfig.value();
					
					if ( config.paths[name] ) {
						// If there's a `paths` config, use it
						
						config.paths[name] = config.paths[name].replace( pattern, value );
						toLoad.push( name );
						
					} else {
						// else, the name is a path
						
						path = req.toUrl( name ).replace( pattern, value );
						toLoad.push( path );
						
					}
                    
                }
				
				req(toLoad, function ( value ) {
					onLoad( value );
				});
            }
        };
    });
}());
