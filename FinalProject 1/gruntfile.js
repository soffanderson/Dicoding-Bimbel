module.exports = function (grunt) {
  grunt.initConfig({
    uncss: {
      dist: {
        files: [{ src: "final_project_css.html", dest: "style.css" }],
      },
    },
    cssmin: {
      dist: {
        files: [{ src: "style.css", dest: "style.css" }],
      },
    },
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-uncss");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  // Default tasks
  grunt.registerTask("default", ["uncss", "cssmin"]);
};
