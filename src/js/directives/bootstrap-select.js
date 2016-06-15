angular.module('app')
    .directive('selectpicker', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, el, attrs) {
                //if (scope.$last === true) {
                    $timeout(function() {
                        $(el).selectpicker();

                        var model = attrs.selectpicker;
                        if (model != undefined && model != "" && model != null) {
                            scope.$watch(model, function (newValue, oldValue) {
                                $(el).selectpicker('refresh');
                            });
                        }
                    });
                //}
            }
        };
    }]);