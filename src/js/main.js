'use strict';

/* Controllers */
var version = 1;

angular.module('app')
    .service('$api', ['$http', '$auth', '$sessionStorage', '$state', "Notification", "$q", function ($http, $auth, $sessionStorage, $state, Notification, $q) {

        this.get = function (url, data) {
            if (typeof  data == "undefined") {
                data = {};
            }

            if ($sessionStorage.sessionId) {
                data.sessionId = $sessionStorage.sessionId;
            }

            return $http.get(url, {params: data}).then(function(response) {
                return response;
            }, function(response) {
                if (response.data.status == "error" && response.data.error == "Not Authorized.") {
                    // Redirect user to login page if we get not authorized error
                    $sessionStorage.sessionId = null;
                    $state.go("auth");
                }
                return response;
            });
        };

        this.post = function (url, data) {
            if (typeof  data == "undefined") {
                data = {};
            }

            if ($sessionStorage.sessionId) {
                data.sessionId = $sessionStorage.sessionId;
            }

            data = JSON.stringify(data);

            return $http.post(url, data).then(function(response) {
                return response;
            }, function(response) {
                if (response.data.status == "error" && response.data.error == "Not Authorized.") {
                    // Redirect user to login page if we get not authorized error
                    $sessionStorage.sessionId = null;
                    $state.go("auth");
                }
                return response;
            });
        };
    }])
    .controller('AppCtrl', ['$scope', '$localStorage', '$sessionStorage', '$http', '$auth', '$state', "$rootScope",
        function ($scope, $localStorage, $sessionStorage, $http, $auth, $state, $rootScope) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            if (isIE) {
                angular.element(window.document.body).addClass('ie');
            }

            // config
            $scope.app = {
                name: 'CrossOver Video App',
                // for chart colors
                color: {
                    primary: '#7266ba',
                    info: '#23b7e5',
                    success: '#27c24c',
                    warning: '#fad733',
                    danger: '#f05050',
                    light: '#e8eff0',
                    dark: '#3a3f51',
                    black: '#1c2b36'
                },
                settings: {
                    themeID: 1,
                    navbarHeaderColor: 'bg-black',
                    navbarCollapseColor: 'bg-white-only',
                    asideColor: 'bg-black',
                    headerFixed: true,
                    asideFixed: true,
                    asideFolded: true,
                    asideDock: false,
                    container: false,
                }
            };

            if (angular.isDefined($sessionStorage.sessionId)) {
                $rootScope.sessionId = $sessionStorage.sessionId;
            }
        }]);
