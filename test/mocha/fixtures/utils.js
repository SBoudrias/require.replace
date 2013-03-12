define([
	"jquery"
], function( $ ) {
	
	var getUuid = (function() {
		var uid = 0;

		return function() {
			return 'uniq_' + uid++;
		};
	}());

	return {

		/**
		 * Create new Require local context
		 * @param  {object} conf RequireJS configuration object
		 * @return {function}    Contextualized require function
		 */
		context: function( conf ) {
			return require.config($.extend({
				context: getUuid(),
				baseUrl: "fixtures",
				paths: {
					all: "nls/all",
					shim_all: "nls/shim_all",
					replace: "../../../require.replace"
				},
				shim: {
					shim_all: {
						exports: "LANG_FILE"
					}
				}
			}, conf || {}));
		}
	};
});
