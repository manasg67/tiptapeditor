module.exports = function(grunt) {
    grunt.initConfig({
      replace: {
        gtag: {
          src: ['docs/index.html', 'docs/404.html'],
          overwrite: true,
          replacements: [{
            from: /<\/body>/,
            to: `
  </body>`
          }]
        }
      }
    });
  
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.registerTask('default', ['replace:gtag']);
  };
  