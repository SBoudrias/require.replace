// ---
// Test test utility

define([
	"jquery",
	"utils"
], function( $, utils ) {

	describe("Test utility", function() {
		it("create different context", function( done ) {
			var r1 = utils.context();
			var r2 = utils.context();

			r1([ "stub_module" ], function( mod ) {
				var def1 = $.Deferred();
				var def2 = $.Deferred();
				expect( mod.a ).to.equal("a");
				mod.a = "foo";

				r1([ "stub_module" ], function( mod ) {
					expect( mod.a ).to.equal("foo");
					def1.resolve();
				});

				r2([ "stub_module" ], function( mod ) {
					expect( mod.a ).to.equal("a");
					def2.resolve();
				});

				$.when( def1, def2 ).done( done );
			});


		});
	});

});
