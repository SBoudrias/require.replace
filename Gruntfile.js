// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
/*jshint strict:false */
module.exports = function( grunt ) {

  var files = [
    "Gruntfile.js",
    "require.replace.js",
    "test/mocha/specs/*.js"
  ];
  
  grunt.initConfig({
    
    jshint: {
      options: {
        jshintrc : ".jshintrc"
      },
      files: files
    },

    watch: {
      files: files,
      tasks: "travis"
    },

    connect: {
      run: {
        options: {
          port: 3000,
          keepalive: true
        }
      }
    },

    mocha: {
      all: [ "test/mocha/**/*.html" ]
    }
    
  });
  
  grunt.loadNpmTasks("grunt-contrib");
  grunt.loadNpmTasks("grunt-mocha");
  
  grunt.registerTask("default", [ "jshint", "mocha" ]);
  grunt.registerTask("travis", [ "default" ]);
  
};
