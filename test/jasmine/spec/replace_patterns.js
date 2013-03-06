/*jshint strict:false */
describe("Replace! pattern", function() {
	
	beforeEach(function() {
		requirejs.undef( 'all' );
		requirejs.undef( 'replace' );
		requirejs.undef( 'replace!all' );
		requirejs.undef( 'replace!nls/all' );
		requirejs.undef( 'nls/all' );
		require.config({
			paths: {
				all: "nls/all",
				shim_all: "nls/shim_all",
				replace: "../../../../require.replace"
			},
			shim: {
				shim_all: {
					exports: "LANG_FILE"
				}
			}
		});
	});
	
	it("can be a string", function() {
		
		// Set config
		require.config({
			config: {
				replace: {
					pattern: "nls",
					value: function() {
						return "en_US";
					}
				}
			}
		});
		
		// run test
		var flag = false;
		
		runs(function() {
			require(["replace!all"], function( module ) {
				flag = true;
				expect(module).toBe('en_US');
			});
		});
		
		waitsFor(function() {
			return flag;
		}, "module haven't loaded", 4000);
		
	});
	
	it("can be a RegExp", function() {
		
		// Set config
		require.config({
			config: {
				replace: {
					pattern: new RegExp("nls"),
					value: function() {
						return "fr_CA";
					}
				}
			}
		});
		
		// run test
		var flag = false;
		
		runs(function() {
			require(["replace!all"], function( module ) {
				flag = true;
				expect(module).toBe('fr_CA');
			});
		});
		
		waitsFor(function() {
			return flag;
		}, "module haven't loaded", 4000);
		
	});
	
});
