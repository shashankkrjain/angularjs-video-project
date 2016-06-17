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
                    'angular-sanitize/angular-sanitize.js',
                    'ngstorage/ngStorage.js',
                    'oclazyload/dist/**',
                    'angular-mocks/angular-mocks.js',
                    'satellizer/**',
                    'angular-ui-notification/dist/**',
                    'js-md5/build/md5.min.js',
                    'videogular/videogular.min.js',
                    'videogular-themes-default/**',
                    'videogular-controls/controls.min.js',
                    'videogular-buffering/buffering.min.js',
                    'videogular-overlay-play/overlay-play.min.js',
                    'videogular-poster/poster.min.js',
                    'videogular-ima-ads/ima-ads.min.js',
                    'angular-input-stars-directive/**',
                    'ngInfiniteScroll/build/**'
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
