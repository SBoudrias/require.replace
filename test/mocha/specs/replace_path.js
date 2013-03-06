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

		var r3 = utils.context({
			config: {
				replace: {
					pattern: "nls",
					value: function() {
						return "en_US";
					},
					ignore: [ "en_US" ]
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

		it("should allow ignored modules", function( done ) {
			
			r3(["replace!all"], function( module ) {
				expect(typeof module).to.equal('undefined');
				done();
			});

		});
		
	});

});
