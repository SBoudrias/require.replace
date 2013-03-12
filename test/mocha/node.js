var expect    = require('chai').expect;
var exec      = require('child_process').exec;
var requirejs = require('requirejs');
var fs        = require('fs');
var _         = require('lodash');

var baseConfig = {
	baseUrl: 'test/mocha/fixtures',
	paths: {
		all: "nls/all",
		shim_all: "nls/shim_all",
		replace: "../../../require.replace"
	},
	name: 'stub-build-module'
};

describe("Build system", function() {

	it("shoulde exclude replace!modules by default", function( done ) {
		var locConfig = _.extend({}, baseConfig, {
			out: 'test/mocha/build/main-built-1.js',
			config: {
				replace: {
					value: function() {
						return "fr_CA";
					},
					pattern: "nls"
				}
			}
		});

		requirejs.optimize(locConfig, function() {
			var contents = fs.readFileSync(locConfig.out, 'utf8');
			var modIndex = contents.indexOf('define("all"');
			expect(modIndex).to.equal(-1);
			done();
		}, function( err ) {
			done( err );
		});
	});

	it("should exclude `optimize: false` modules", function( done ) {
		var locConfig = _.extend({}, baseConfig, {
			out: 'test/mocha/build/main-built-2.js',
			config: {
				replace: {
					value: "fr_CA",
					optimize: false,
					pattern: "nls"
				}
			}
		});

		requirejs.optimize(locConfig, function() {
			var contents = fs.readFileSync(locConfig.out, 'utf8');
			var modIndex = contents.indexOf('define("all"');
			expect(modIndex).to.equal(-1);
			done();
		}, function( err ) {
			done( err );
		});
	});

	it("should include `optimize: true` modules", function( done ) {
		var locConfig = _.extend({}, baseConfig, {
			out: 'test/mocha/build/main-built-3.js',
			config: {
				replace: {
					value: "fr_CA",
					optimize: true,
					pattern: "nls"
				}
			}
		});

		requirejs.optimize(locConfig, function() {
			var contents = fs.readFileSync(locConfig.out, 'utf8');
			var modIndex = contents.indexOf('define("all"');
			expect(modIndex).to.be.at.least(0);
			done();
		}, function( err ) {
			done( err );
		});
	});

});
