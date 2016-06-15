angular.module('app')
    .directive('snapPermission', ['$rootScope', function($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, el, attrs) {
                var permission = attrs.snapPermission;
                var currentUser = scope.user;

                if (currentUser.permissions.indexOf(permission) == -1) {
                    // current user is not allowed to see this option
                    el.remove();
                }

            }
        };
    }]);