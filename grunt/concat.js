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
            "libs/angular/ngstorage/ngStorage.js",
            "libs/angular/angular-ui-utils/ui-utils.js",
            "libs/angular/angular-bootstrap/ui-bootstrap-tpls.js",
            "src/js/app.js",
            "src/js/config.js",
            "src/js/config.lazyload.js",
            "src/js/main.js",
            "src/js/services/ui-load.js",
            "src/js/filters/fromNow.js",
            "src/js/filters/propsFilter.js",
            "src/js/directives/setnganimate.js",
            "src/js/directives/ui-butterbar.js",
            "src/js/directives/ui-focus.js",
            "src/js/directives/ui-fullscreen.js",
            "src/js/directives/ui-jq.js",
            "src/js/directives/ui-module.js",
            "src/js/directives/ui-nav.js",
            "src/js/directives/ui-scroll.js",
            "src/js/directives/ui-shift.js",
            "src/js/directives/ui-toggleclass.js"
        ],
        dest: 'js/app.js'
    },
    "css": {
        options : {
            //sourceMap :true
        },
        src: [
            "libs/assets/animate.css/animate.css",
            "libs/assets/font-awesome/css/font-awesome.min.css",
            "libs/jquery/bootstrap/dist/css/bootstrap.css",
            "src/css/font.css",
            "src/css/app.css"
        ],
        dest: 'css/app.css'
    }
};
