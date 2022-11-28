module.exports = function (grunt) {
  grunt.initConfig({
    uncss: {
      dist: {
        files: [{ src: "index.html", dest: "assets/css/style.css" }],
      },
    },
    cssmin: {
      dist: {
        files: [{ src: "assets/css/style.css", dest: "assets/css/style.css" }],
      },
    },
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-uncss");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  // Default tasks
  grunt.registerTask("default", ["uncss", "cssmin"]);
};
