// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
/*jshint strict:false */
/*global module:true grunt:true */
module.exports = function(grunt) {
  
  grunt.initConfig({
    
    pkg: '<json:package.json>',
    
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    
    lint: {
      files: [
        "grunt.js",
        "require.replace.js",
        "test/jasmine/spec/*.js",
        "test/assets/**/*.js"
      ]
    },
    
    watch: {
      files: '<config:lint.files>',
      tasks: 'travis'
    },
    
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    
    jshint: {
      options: {
        scripturl: true
      }
    },
    
    jasmine: {
      all: ["test/jasmine/*.html"]
    }
    
  });
  
  grunt.loadNpmTasks('grunt-jasmine-task');
  
  grunt.registerTask("default", "lint jasmine concat min");
  grunt.registerTask("travis", "lint jasmine");
  
};
