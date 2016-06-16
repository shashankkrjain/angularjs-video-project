'use strict';

/* Controllers */

angular.module('app')
    .service('$api', ['$http', '$auth', '$sessionStorage', '$state', "Notification", "$q", function ($http, $auth, $sessionStorage, $state, Notification, $q) {

        this.get = function (url, data) {
            if (typeof  data == "undefined") {
                data = {};
            }

            if ($sessionStorage.sessionId) {
                data.sessionId = $sessionStorage.sessionId;
            }

            return $http.get(urlBase + "/" + url, {params: data});
        };

        this.post = function (url, data) {
            if (typeof  data == "undefined") {
                data = {};
            }

            if ($sessionStorage.sessionId) {
                data.sessionId = $sessionStorage.sessionId;
            }

            data = JSON.stringify(data);

            return $http.post(urlBase + "/" + url, data);
        };
    }])
    .controller('AppCtrl', ['$scope', '$localStorage', '$sessionStorage', '$http', '$auth', '$state', "$rootScope",
        function ($scope, $localStorage, $sessionStorage, $http, $auth, $state, $rootScope) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i);
            if (isIE) {
                angular.element($sessionStorage.document.body).addClass('ie');
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

            if (angular.isDefined($localStorage.sessionId)) {
                $rootScope.sessionId = $localStorage.sessionId;
            }
        }]);
