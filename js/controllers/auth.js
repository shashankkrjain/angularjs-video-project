'use strict';

/* Controllers */

angular.module('app')
    .controller('AuthController', function ($scope, $http, $state, $auth, $sessionStorage, $stateParams, $rootScope, $api) {

        $rootScope.pageName = "Login";

        $scope.login = function() {
            $scope.user.password = md5($scope.user.password);
            $api.post("user/auth", $scope.user).then(function(response) {
               if (response.data.status == "success") {
                   $sessionStorage.sessionId = response.data.sessionId;
                   $sessionStorage.user = response.data.username;
                   $state.go("app.index");
               }
            });
        }

    });