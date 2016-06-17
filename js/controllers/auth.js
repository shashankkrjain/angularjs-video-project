'use strict';

/* Controllers */

angular.module('app')
    .controller('AuthController', function ($scope, $http, $state, $auth, $sessionStorage, $stateParams, $rootScope, $api) {

        $rootScope.pageName = "Login";

        $scope.login = function() {
            // Md5 encrypt password
            $scope.user.password = md5($scope.user.password);

            // Send request
            $api.post("/user/auth", $scope.user).then(function(response) {
               if (response.data.status == "success") {
                   // Store session ID in session storage
                   $sessionStorage.sessionId = response.data.sessionId;
                   $sessionStorage.user = response.data.username;
                   $state.go("app.index");
               }
            });
        }

    });