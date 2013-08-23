module.exports = function(grunt) {
  grunt.initConfig({
    jasmine : {
      // Your project's source files
      src : 'pydy_viz/static/js/src/canvas.js',
      // Your Jasmine spec files
      specs : 'pydy_viz/static/js/spec/CanvasSpec.js',
      // Your spec helper files
      helpers : ''
    }
  });

  // Register tasks.
  grunt.loadNpmTasks('grunt-jasmine-runner');

  // Default task.
  grunt.registerTask('default', 'jasmine');
};
