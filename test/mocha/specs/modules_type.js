define([
	"utils"
], function( utils ) {

	describe("Replace! modules", function() {

		var r = utils.context({
			config: {
				replace: {
					pattern: "nls",
					value: "en_US"
				}
			}
		});
		
		it("can be AMD", function( done ) {
			
			r(["replace!all"], function( module ) {
				expect(module).to.equal('en_US');
				done();
			});
			
		});
		
		it("can use Shim", function( done ) {

			r(["replace!shim_all"], function( module ) {
				expect(module).to.equal('en_US');
				done();
			});
			
		});
		
		it("can use inline named modules", function( done ) {
			
			define("en_US/inline", [], function() {
				return "named module";
			});

			r(["replace!nls/inline"], function( module ) {
				expect(module).to.equal('named module');
				done();
			});

		});
		
	});

});
