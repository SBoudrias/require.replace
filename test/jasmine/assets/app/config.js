/*global require:true define:true */
// Set the require.js configuration for your application.
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
