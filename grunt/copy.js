module.exports = {
    libs:{
        files:[
            {
                src:  [
                    'angular/angular.js',
                    'angular-animate/angular-animate.js',
                    'angular-aria/angular-aria.js',
                    'angular-bootstrap/ui-bootstrap-tpls.js',
                    'angular-ui-router/release/**',
                    'angular-ui-utils/ui-utils.js',
                    'ngstorage/ngStorage.js',
                    'oclazyload/dist/**',
                    'satellizer/**',
                    'angular-ui-notification/dist/**',
                    'js-md5/build/md5.min.js'
                ],
                dest: 'libs/angular',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  [
                    'jquery/dist/jquery.js',
                    'bootstrap/dist/**',
                    'moment/moment.js'
                ],
                dest: 'libs/jquery',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  [
                    'animate.css/animate.css',
                    'font-awesome/css/**',
                    'font-awesome/fonts/**'
                ],
                dest: 'libs/assets',
                cwd:  'bower_components',
                expand: true
            },
            {src: '**', cwd: 'bower_components/bootstrap/dist/fonts', dest: 'src/fonts', expand: true}
        ]
    },
    angular: {
        files: [
            {expand: true, src: ['css/**', '!**/less/**', '!*.html'], cwd: 'src/',   dest: ""}
        ]
    }

};
