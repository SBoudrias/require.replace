/*jshint strict:false */
describe("Replace! modules", function() {
	
	beforeEach(function() {
		requirejs.undef( 'all' );
		requirejs.undef( 'fr_CA/all' );
		requirejs.undef( 'en_US/all' );
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
			},
			config: {
				replace: {
					pattern: "nls",
					value: function() {
						return "en_US";
					}
				}
			}
		});
	});
	
	it("can be AMD", function() {
		
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
	
	it("can use Shim", function() {
		
		// run test
		var flag = false;
		
		runs(function() {
			require(["replace!shim_all"], function( module ) {
				flag = true;
				expect(module).toBe('en_US');
			});
		});
		
		waitsFor(function() {
			return flag;
		}, "module haven't loaded", 4000);
		
	});
	
	it("can use inline named modules", function() {
		
		define("en_US/inline", [], function() {
			return "named module";
		});
		
		// run test
		var flag = false;
		
		runs(function() {
			require(["replace!nls/inline"], function( module ) {
				flag = true;
				expect(module).toBe('named module');
			});
		});
		
		waitsFor(function() {
			return flag;
		}, "module haven't loaded", 4000);
		
	});
	
});
