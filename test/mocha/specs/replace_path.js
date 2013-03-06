define([
	"utils"
], function( utils ) {
	
	describe("Replace! path", function() {

		var r = utils.context({
			config: {
				replace: {
					pattern: "nls",
					value: function() {
						return "en_US";
					}
				}
			}
		});

		var r2 = utils.context({
			config: {
				replace: {
					pattern: "nls",
					value: function() {
						return "fr_CA";
					}
				}
			}
		});
		
		it("can use `paths` config", function( done ) {
			
			r(["replace!all"], function( module ) {
				expect(module).to.equal('en_US');
				done();
			});
			
		});
		
		it("can be a path", function( done ) {

			r2(["replace!nls/all"], function( module ) {
				expect(module).to.equal('fr_CA');
				done();
			});

		});
		
	});

});
