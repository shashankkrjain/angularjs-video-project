'use strict';

// !!!!IMPORTANT: Do not change this file. Generate it using "php artisan build:routes" command



/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams', "$auth", "$location", "$localStorage",
            function ($rootScope, $state, $stateParams, $auth, $location, $localStorage) {
                $rootScope.$on( "$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
                    console.log(toState.name);
                    if (!$auth.isAuthenticated()) {
                        if ( toState.name.indexOf("manager") == 0 || toState.name.indexOf("employee") == 0) {
                            $location.path("/login");
                        }
                    }
                    else {
                        // If user is on login page
                        if ( toState.name.indexOf("auth") == 0) {
                            if ($localStorage.user.type == "Superadmin" || $localStorage.user.type == "Admin" || $localStorage.user.type == "Manager") {
                                $location.path("/manager/dashboard");
                            }
                            else {
                                $location.path("/employee/dashboard");
                            }
                        }
                    }
                });
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        function ($stateProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG, $authProvider, $locationProvider) {
            // Satellizer configuration that specifies which API
            // route the JWT should be retrieved from
            $authProvider.loginUrl = '/api/auth/login';

            $locationProvider.html5Mode(true);

            $urlRouterProvider.otherwise('/404');

            $stateProvider.state('manager.accounting', {
                    url: '/accounting',
templateUrl: 'modules/accounting/accounting/accounting_view.html?v=' + hashes['modules/accounting/accounting/accounting_view.html'],
abstract: true
}).state('manager.accounting.index', {
                    url: '',
templateUrl: 'modules/accounting/accounting/accounting_index.html?v=' + hashes['modules/accounting/accounting/accounting_index.html'],
resolve: load(['ui.select','angularFileUpload','modules/accounting/js/controllers/accounting.js?v=' + hashes['modules/accounting/js/controllers/accounting.js']])
}).state('manager.accounting.create', {
                    url: '/create',
templateUrl: 'modules/accounting/accounting/accounting_create.html?v=' + hashes['modules/accounting/accounting/accounting_create.html'],
controller: 'AccountingCreateController',
resolve: load(['ui.select','angularFileUpload','modules/accounting/js/controllers/accounting.js?v=' + hashes['modules/accounting/js/controllers/accounting.js']])
}).state('404', {
                    url: '/404',
templateUrl: 'modules/core/404.html?v=' + hashes['modules/core/404.html']
}).state('auth', {
                    url: '/login',
templateUrl: 'modules/core/signin.html?v=' + hashes['modules/core/signin.html'],
controller: 'AuthController as auth',
resolve: load(['modules/core/js/controllers/auth.js?v=' + hashes['modules/core/js/controllers/auth.js']])
}).state('forgot_password', {
                    url: '/forgot_password',
templateUrl: 'modules/core/forgot_password.html?v=' + hashes['modules/core/forgot_password.html'],
controller: 'AuthController as auth',
resolve: load(['modules/core/js/controllers/auth.js?v=' + hashes['modules/core/js/controllers/auth.js']])
}).state('manager', {
                    url: '/manager',
templateUrl: 'modules/core/layout.html?v=' + hashes['modules/core/layout.html'],
abstract: true
}).state('manager.dashboard', {
                    url: '/dashboard',
templateUrl: 'modules/core/app.html?v=' + hashes['modules/core/app.html'],
resolve: load(['modules/core/js/controllers/dashboard.js?v=' + hashes['modules/core/js/controllers/dashboard.js']])
}).state('logout', {
                    url: '/logout',
controller: function($scope, $auth, $state) {
      $auth.logout();
      $state.go("auth");
    }
}).state('password_reset', {
                    url: '/password_reset/{token:[0-9A-Za-z]+}',
templateUrl: 'modules/core/password_reset.html?v=' + hashes['modules/core/password_reset.html'],
controller: 'AuthController as auth',
resolve: load(['modules/core/js/controllers/auth.js?v=' + hashes['modules/core/js/controllers/auth.js']])
}).state('employee', {
                    url: '/employee',
templateUrl: 'modules/core/layout.html?v=' + hashes['modules/core/layout.html'],
abstract: true
}).state('manager.appreciations', {
                    url: '/appreciations',
templateUrl: 'modules/appreciations/appreciations/appreciations_view.html?v=' + hashes['modules/appreciations/appreciations/appreciations_view.html'],
abstract: true
}).state('manager.appreciations.index', {
                    url: '',
templateUrl: 'modules/appreciations/appreciations/appreciations_index.html?v=' + hashes['modules/appreciations/appreciations/appreciations_index.html'],
controller: 'AppreciationsController',
resolve: load(['ui.select','angularFileUpload','modules/appreciations/js/controllers/appreciations.js?v=' + hashes['modules/appreciations/js/controllers/appreciations.js']])
}).state('manager.news', {
                    url: '/news',
templateUrl: 'modules/news/news/news_view.html?v=' + hashes['modules/news/news/news_view.html'],
abstract: true
}).state('manager.news.index', {
                    url: '',
templateUrl: 'modules/news/news/news_index.html?v=' + hashes['modules/news/news/news_index.html'],
controller: 'NewsController',
resolve: load(['ui.select','angularFileUpload','textAngular','modules/news/js/controllers/news.js?v=' + hashes['modules/news/js/controllers/news.js']])
}).state('manager.tasks', {
                    url: '/tasks',
templateUrl: 'modules/task/task/tasks_view.html?v=' + hashes['modules/task/task/tasks_view.html'],
abstract: true
}).state('manager.tasks.index', {
                    url: '',
templateUrl: 'modules/task/task/tasks_index.html?v=' + hashes['modules/task/task/tasks_index.html'],
controller: 'TasksController',
resolve: load(['ui.select','xeditable','textAngular','moment','modules/task/js/controllers/tasks.js?v=' + hashes['modules/task/js/controllers/tasks.js']])
}).state('manager.holidays', {
                    url: '/holidays',
templateUrl: 'modules/holidays/assets/holidays_view.html?v=' + hashes['modules/holidays/assets/holidays_view.html'],
abstract: true
}).state('manager.holidays.index', {
                    url: '',
templateUrl: 'modules/holidays/assets/holidays_index.html?v=' + hashes['modules/holidays/assets/holidays_index.html'],
controller: 'HolidaysController',
resolve: load(['moment','fullcalendar','ui.calendar','ui.select','modules/holidays/js/controllers/holidays.js?v=' + hashes['modules/holidays/js/controllers/holidays.js']])
}).state('manager.departments', {
                    url: '/departments',
templateUrl: 'modules/employee/departments/departments_view.html?v=' + hashes['modules/employee/departments/departments_view.html'],
abstract: true
}).state('manager.departments.index', {
                    url: '',
templateUrl: 'modules/employee/departments/departments_index.html?v=' + hashes['modules/employee/departments/departments_index.html'],
controller: 'DepartmentsController',
resolve: load(['modules/employee/js/controllers/departments.js?v=' + hashes['modules/employee/js/controllers/departments.js']])
}).state('manager.designations', {
                    url: '/designations',
templateUrl: 'modules/employee/designations/designations_view.html?v=' + hashes['modules/employee/designations/designations_view.html'],
abstract: true
}).state('manager.designations.index', {
                    url: '',
templateUrl: 'modules/employee/designations/designations_index.html?v=' + hashes['modules/employee/designations/designations_index.html'],
controller: 'DesignationsController',
resolve: load(['modules/employee/js/controllers/designations.js?v=' + hashes['modules/employee/js/controllers/designations.js']])
}).state('manager.employees', {
                    url: '/employees',
templateUrl: 'modules/employee/employees/employees_view.html?v=' + hashes['modules/employee/employees/employees_view.html'],
abstract: true,
resolve: load(['ngImgCrop','angularFileUpload'])
}).state('manager.employees.create', {
                    url: '/create',
templateUrl: 'modules/employee/employees/employees_create.html?v=' + hashes['modules/employee/employees/employees_create.html'],
controller: 'EmployeesController',
resolve: load(['ui.select','modules/employee/js/controllers/employees.js?v=' + hashes['modules/employee/js/controllers/employees.js']])
}).state('manager.employees.index', {
                    url: '',
templateUrl: 'modules/employee/employees/employees_index.html?v=' + hashes['modules/employee/employees/employees_index.html'],
controller: 'EmployeesController',
resolve: load(['modules/employee/js/controllers/employees.js?v=' + hashes['modules/employee/js/controllers/employees.js']])
}).state('manager.employees.edit', {
                    url: '/:id/edit',
templateUrl: 'modules/employee/employees/employees_edit.html?v=' + hashes['modules/employee/employees/employees_edit.html'],
controller: 'EmployeesController',
resolve: load(['ui.select','modules/employee/js/controllers/employees.js?v=' + hashes['modules/employee/js/controllers/employees.js']])
}).state('employee.profile', {
                    url: '/:id/profile',
templateUrl: 'modules/employee/employee_panel/profile.html?v=' + hashes['modules/employee/employee_panel/profile.html'],
controller: 'EmployeeProfileController',
resolve: load(['modules/employee/js/controllers/profile.js?v=' + hashes['modules/employee/js/controllers/profile.js']])
}).state('manager.attendance', {
                    url: '/attendance',
templateUrl: 'modules/attendance/attendance/attendance_view.html?v=' + hashes['modules/attendance/attendance/attendance_view.html'],
abstract: true
}).state('manager.attendance.index', {
                    url: '',
templateUrl: 'modules/attendance/attendance/attendance_index.html?v=' + hashes['modules/attendance/attendance/attendance_index.html'],
controller: 'AttendanceController',
resolve: load([])
}).state('manager.assets', {
                    url: '/assets',
templateUrl: 'modules/assets/assets/assets_view.html?v=' + hashes['modules/assets/assets/assets_view.html'],
abstract: true
}).state('manager.assets.index', {
                    url: '',
templateUrl: 'modules/assets/assets/assets_index.html?v=' + hashes['modules/assets/assets/assets_index.html'],
controller: 'AssetsController',
resolve: load(['ui.select','textAngular','modules/assets/js/controllers/assets.js?v=' + hashes['modules/assets/js/controllers/assets.js']])
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
                                        else {
                                            name = src;
                                        }
                                    });
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
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', '$authProvider'
        ]
    );