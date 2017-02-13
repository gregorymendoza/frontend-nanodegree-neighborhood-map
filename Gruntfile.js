module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),

    	//Tasks
    	cssmin: {
			target: {
		    	files: [{
		      		expand: true,
		      		src: ['css/*.css', '!*.min.css'],
		      		cwd: 'src/',
		      		dest: 'dist/'
		      		//ext: '.min.css'
		    	}]
		  	}
		},
    	uglify: {
    		target: {
      			files: [{
		        	expand: true,
		          	src: ['js/**/*.js', '!*.min.js'],
		          	cwd: 'src/',
		          	dest: 'dist/'
		          	//ext: '.min.js'
      			}]
    		}
    	},
    	htmlmin: {
    		dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'src/index.html',     // 'destination': 'source'
				}
			}
    	}
    });

    // Tasks to load
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['cssmin', 'uglify', 'htmlmin']);
};