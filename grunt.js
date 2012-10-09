module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib');

	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {},
		server: {
			port: 8000,
			base: 'public/'
		},
		files: {
			// Files for the app
			js: ['assets/js/app.js'],
			jsMin: 'assets/js/app.min.js',
			// Libraries
			lib: ['assets/lib/lodash.min.js', 'assets/lib/zepto.min.js'],
			libMin: 'assets/lib/lib.min.js',
			// Application JS output file
			output: 'public/assets/js/app.js',
			// CSS
			css: [
				'assets/less/elements.less', 
				'assets/less/styles.less', 
				// 'assets/less/media.less',
				// 'assets/less/retina.less'
				],
			cssMin: 'public/assets/css/style.css'
		},
		concat: {
			lib: {
				src: '<config:files.lib>',
				dest: '<config:files.libMin>'
			},
			js: {
				src: ['<config:files.libMin>', '<config:files.jsMin>'],
				dest: '<config:files.output>'
			}
		},
		min: {
			js: {
				src: '<config:files.js>',
				dest: '<config:files.jsMin>'
			}
		},
		recess: {
			dist: {
				src: '<config:files.css>',
				dest: '<config:files.cssMin>',
				options: {
					/* Uncomment to override default values */ 
					compile: true, 					// Compiles CSS or LESS. Fixes white space and sort order.
					compress: true, 				// Compress your compiled code
					// noIDs: false, 				// Doesn't complain about using IDs in your stylesheets
					// noJSPrefix: false, 			// Doesn't complain about styling .js- prefixed classnames
					// noOverqualifying: false, 	// Doesn't complain about overqualified selectors (ie: div#foo.bar)
					// noUnderscores: false, 		// Doesn't complain about using underscores in your class names
					// noUniversalSelectors: false, // Doesn't complain about using the universal * selector
					// prefixWhitespace: false, 	// Adds whitespace prefix to line up vender prefixed properties
					// strictPropertyOrder: false, 	// Complains if not strict property order
					// stripColors: true, 			// Strip colors from the Terminal output
					// zeroUnits: false 			// Doesn't complain if you add units to values of 0
				}
			}
		},
		shell: {
			sync: {
				command: 'rm -rf public/; mkdir -p public/assets/img; public/assets/img/; cp *.html public/; cp assets/img/* public/assets/img/',
				stdout: true
			},
			deploy: {
				command: 'git stash; git push origin :gh-pages; git branch -D gh-pages; git symbolic-ref HEAD refs/heads/gh-pages; rm -rf .git/index /tmp/public /tmp/node_modules /tmp/raw; mv public /tmp; mv node_modules /tmp; cp -R assets/raw /tmp; git clean -fdx; mv /tmp/public/* .; git add .; git commit -m "auto-generated deployment to gh-pages"; git push origin gh-pages; git checkout master; mv /tmp/node_modules .; cp -R /tmp/raw assets/; git stash apply',
				stdout: true
			}
		},
		lint: {
			files: ['<config:files.js>']
		},
		watch: {
			less: {
				files: '<config:files.css>',
				tasks: 'recess'
			},
			js: {
				files: '<config:files.js>',
				tasks: 'concat:js'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			},
			globals: {
				jQuery: true
			}
		}
	});

	grunt.registerTask('js', 'concat:lib lint min concat:js');
	grunt.registerTask('less', 'recess');
	grunt.registerTask('default', 'concat:lib lint min concat:js recess server watch');
};