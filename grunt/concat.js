module.exports = {
    js: {
        src: [
            "libs/jquery/jquery/dist/jquery.js",
            "libs/jquery/bootstrap/dist/js/bootstrap.js",
            "libs/angular/angular/angular.js",
            "libs/jquery/moment/moment.js",
            "libs/angular/angular-animate/angular-animate.js",
            "libs/angular/angular-aria/angular-aria.js",
            "libs/angular/angular-ui-router/release/angular-ui-router.js",
            "libs/angular/angular-sanitize/angular-sanitize.js",
            "libs/angular/ngstorage/ngStorage.js",
            "libs/angular/angular-ui-utils/ui-utils.js",
            "libs/angular/angular-bootstrap/ui-bootstrap-tpls.js",
            "libs/angular/satellizer/satellizer.min.js",
            "libs/angular/oclazyload/dist/ocLazyLoad.js",
            "libs/angular/angular-mocks/angular-mocks.js",
            "libs/angular/angular-ui-notification/dist/angular-ui-notification.js",
            "libs/angular/js-md5/build/md5.min.js",
            "libs/angular/videogular/videogular.min.js",
            "libs/angular/videogular-controls/controls.min.js",
            "libs/angular/videogular-buffering/buffering.min.js",
            "libs/angular/videogular-overlay-play/overlay-play.min.js",
            "libs/angular/videogular-poster/poster.min.js",
            "libs/angular/angular-input-stars-directive/angular-input-stars.js",
            'libs/angular/ngInfiniteScroll/build/ng-infinite-scroll.js',
            "src/js/app.js",
            "src/js/config.js",
            "src/js/config.lazyload.js",
            "src/js/main.js",
            "src/js/services/ui-load.js",
            "src/js/filters/fromNow.js",
            "src/js/filters/propsFilter.js"
        ],
        dest: "js/app.js"
    },
    "css": {
        options : {
            //sourceMap :true
        },
        src: [
            "libs/assets/animate.css/animate.css",
            "libs/assets/font-awesome/css/font-awesome.min.css",
            "libs/jquery/bootstrap/dist/css/bootstrap.css",
            "libs/angular/angular-input-stars-directive/angular-input-stars.css",
            "src/css/font.css",
            "src/css/app.css"
        ],
        dest: "css/app.css"
    }
};
