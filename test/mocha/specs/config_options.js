/*jshint strict:false */
define([
	"utils"
], function( utils ) {
	
	describe("Replace! configuration", function() {
		
		it("work with general config", function( done ) {
			
			var r = utils.context({
				config: {
					replace: {
						pattern: "nls",
						value: function() {
							return "fr_CA";
						}
					}
				}
			});

			r(["replace!all"], function( module ) {
				expect(module).to.equal('fr_CA');
				done();
			});
			
		});
		
		it("work with `by files` config", function( done ) {
			
			var r = utils.context({
				config: {
					replace: {
						all: {
							pattern: "nls",
							value: function() {
								return "en_US";
							}
						}
					}
				}
			});
			
			r(["replace!all"], function( module ) {
				expect(module).to.equal('en_US');
				done();
			});
			
		});
		
	});

});
