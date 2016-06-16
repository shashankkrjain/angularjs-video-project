'use strict';
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams', "$auth", "$location", "$sessionStorage",
            function ($rootScope, $state, $stateParams, $auth, $location, $sessionStorage) {
                $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                    if (!$sessionStorage.sessionId) {
                        if ( toState.name.indexOf("app") == 0) {
                            $location.path("/login");
                        }
                    }
                    else {
                        // If user is on login page
                        if ( toState.name.indexOf("auth") == 0) {
                            $location.path("/");
                        }
                    }
                });
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        function ($stateProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG, $authProvider) {
            $urlRouterProvider.otherwise('/404');

            $authProvider.loginUrl = '/user/login';

            $stateProvider.state('app', {
                url: '/index',
                templateUrl: '/templates/layout.html',
                abstract: true
            }).state('app.index', {
                url: '/',
                templateUrl: '/templates/app.html',
                resolve: load(['/js/controllers/index.js'])
            }).state('404', {
                url: '/404',
                templateUrl: '/templates/404.html'
            }).state('auth', {
                url: '/login',
                templateUrl: '/templates/signin.html',
                controller: 'AuthController as auth',
                resolve: load(['/js/controllers/auth.js'])
            }).state('logout', {
                url: '/logout',
                controller: function ($scope, $auth, $state) {
                    $auth.logout();
                    $state.go("auth");
                }
            });

            function load(srcs, callback) {
                return {
                    deps: ['$ocLazyLoad', '$q',
                        function ($ocLazyLoad, $q) {
                            var deferred = $q.defer();
                            var promise = false;
                            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);

                            if (!promise) {
                                promise = deferred.promise;
                            }

                            angular.forEach(srcs, function (src) {
                                promise = promise.then(function () {
                                    if (JQ_CONFIG[src]) {
                                        return $ocLazyLoad.load(JQ_CONFIG[src]);
                                    }
                                    angular.forEach(MODULE_CONFIG, function (module) {
                                        if (module.name == src) {
                                            name = module.name;
                                        }
                                    });

                                    if (!name) {
                                        name = src;
                                    }
                                    return $ocLazyLoad.load(name);
                                });
                            });

                            deferred.resolve();
                            return callback ? promise.then(function () {
                                return callback();
                            }) : promise;
                        }]
                }
            }
        },
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', '$authProvider']
    );