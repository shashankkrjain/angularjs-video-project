// config

var app =
    angular.module('app')
        .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

                // lazy controller, directive and service
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
                app.constant = $provide.constant;
                app.value = $provide.value;
            }
        ])
        .config(['NotificationProvider', function (NotificationProvider) {
            NotificationProvider.setOptions({
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20
            });
        }]);
