// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
/*jshint strict:false */
module.exports = function( grunt ) {
  
  grunt.initConfig({

    watch: {
      files: "<%= lint.files %>",
      tasks: "travis"
    },
    
    jshint: {
      options: {
        jshintrc : ".jshintrc"
      },
      files: [
        "Gruntfile.js",
        "require.replace.js",
        "test/jasmine/spec/*.js",
        "test/assets/**/*.js"
      ]
    },
    
    jasmine: {
      all: [ "test/jasmine/*.html" ]
    }
    
  });
  
  grunt.loadNpmTasks("grunt-contrib");
  
  grunt.registerTask("default", [ "jshint", "jasmine" ]);
  grunt.registerTask("travis", [ "default" ]);
  
};
