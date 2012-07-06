/*jshint strict:false */
/*global describe:true it:true expect:true beforeEach:true afterEach:true waitsFor:true runs:true require:true define:true requirejs:true */

describe("Replace! modules", function() {
	
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
			},
			config: {
				replace: {
					pattern: "nls",
					value: function() {
						return "fr_CA";
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
				expect(module).toBe('fr_CA');
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
				expect(module).toBe('fr_CA');
			});
		});
		
		waitsFor(function() {
			return flag;
		}, "module haven't loaded", 4000);
		
	});
	
});