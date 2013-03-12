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

    clean: {
      test: [ "test/mocha/build" ]
    },
    
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
    },

    simplemocha: {
      options: {
        ui: "bdd",
        reporter: "spec"
      },
      all: "test/mocha/node.js"
    }
    
  });
  
  grunt.loadNpmTasks("grunt-contrib");
  grunt.loadNpmTasks("grunt-mocha"); // client side mocha
  grunt.loadNpmTasks('grunt-simple-mocha'); // server side mocha
  
  grunt.registerTask("default", [ "jshint", "mocha", "simplemocha", "clean:test" ]);
  grunt.registerTask("travis", [ "default" ]);
  
};
