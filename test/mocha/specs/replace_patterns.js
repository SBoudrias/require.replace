define([
	"utils"
], function( utils ) {
	
	describe("Replace! pattern", function() {
		
		it("can be a string", function( done ) {
			
			var r = utils.context({
				config: {
					replace: {
						pattern: "nls",
						value: "en_US"
					}
				}
			});
		
			r(["replace!all"], function( module ) {
				expect(module).to.equal('en_US');
				done();
			});
			
		});
		
		it("can be a RegExp", function( done ) {
			
			var r = utils.context({
				config: {
					replace: {
						pattern: new RegExp("nls"),
						value: "fr_CA"
					}
				}
			});
			
			r(["replace!all"], function( module ) {
				expect(module).to.equal('fr_CA');
				done();
			});
			
		});
		
	});


});
