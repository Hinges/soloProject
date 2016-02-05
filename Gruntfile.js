module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                files: {
                    'server/public/assets/scripts/clientLogin.min.js': ['client/clientLogin.js'],
                    'server/public/assets/scripts/clientUser.min.js': ['client/clientUser.js'],
                    'server/public/assets/scripts/client.min.js': ['client/client.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['client/clientLogin.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            another: {
                files: ['client/client.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular-route/angular-route.min.js",
                    "angular/angular-csp.css",
                    "bootstrap/*.*",
                    "bootstrap/**/*.*"
                    //booststrap/dist/css/booststrap.min.css
                ],
                "dest": "server/public/vendors/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify']);

};
