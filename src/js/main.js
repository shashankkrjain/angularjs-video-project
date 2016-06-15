'use strict';

/* Controllers */

angular.module('app')
    .service('$api', ['$http', '$auth', '$state', "$translate", "Notification", "$q", function ($http, $auth, $state, $translate, Notification, $q) {

        // urlBase is defined in index.blade.php
        this.get = function (url, data) {
            if (isArray(url)) {
                var $promises = [];

                angular.forEach(url, function(item) {
                   $promises.push($http.get(urlBase + "/" + item.url, {params: item.data}));
                });

                return $q.all($promises).then(function (response) {
                    var $results = [];
                    angular.forEach(response, function(item) {
                       $results.push(handleSuccess(item));
                    });

                    return $results;

                }, function(response) {
                    return response;
                });
            }
            else {
                var $promise = $http.get(urlBase + "/" + url, {params: data});

                $promise.then(handleSuccess, handleError);

                return $promise;
            }
        };

        this.post = function (url, data) {
            // Convert to JSON string  if object is passed
            if (typeof data == "object") {
                data = JSON.stringify(data);
            }

            var $promise = $http.post(urlBase + "/" + url, data);
            $promise.then(handleSuccess, handleError);

            return $promise;
        };

        function handleSuccess(r) {
            var refreshToken = r.headers('Authorization');
            if (refreshToken != null && typeof refreshToken != "undefined") {
                $auth.setToken(refreshToken.replace('Bearer ', ''));
            }

            // Transform date fields to date objects
            if (typeof r.data == "object") {
                if (!isArray(r.data.data) && typeof r.data.data == "object") {
                    r.data.data = convertDateFields(r.data.data);
                }
                else
                    if (Object.prototype.toString.call(r.data.data) === '[object Array]') {
                        // Returned value is an array, so convert date fields of each object in array
                        for(var i=0; i< r.data.data.length; i++) {
                            r.data.data[i] = convertDateFields(r.data.data[i]);
                        }
                    }
            }

            return r;

        }

        function convertDateFields(object) {
            var regexIso8601 = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/;

            //var date_fields = object.date_fields;
            //
            //if (typeof date_fields == "object") {
            //    for(var i = 0; i < date_fields.length; i++) {
            //        try {
            //            var date = object[date_fields[i]];
            //
            //            // expecting MySQL date
            //            // Split timestamp into [ Y, M, D, h, m, s ]
            //            var t = date.split(/[- :]/);
            //
            //            // Apply each element to the Date function
            //            //if (t[3] == 0 && t[4] == 0 && t[5] == 0) {
            //            //    // Since hour, min, second are all zero, we assume its a date only field, so timezone
            //            //    // conversion is not required
            //            //    object[date_fields[i]] = new Date(t[0], (t[1] - 1), t[2], t[3], t[4], t[5]);
            //            //}
            //            //else {
            //                object[date_fields[i]] = new Date(t[0]+"-"+ t[1] +"-"+t[2]+"T"+t[3]+":"+t[4]+":"+t[5]+"Z");
            //            //}
            //        }
            //        catch (e) {
            //
            //        }
            //    }
            //}

            // Loop over other fields and check if they are object or array and apply conversion method to them
            for (var property in object) {
                if (object.hasOwnProperty(property)) {
                    if (isArray(object[property])) {
                        for(var j=0;j<object[property].length;j++) {
                            object[property][j] = convertDateFields(object[property][j]);
                        }
                    }
                    else if(property == "custom_field_data") {
                        // Convert custom fields to date object
                        for (var prop in object.custom_field_data) {
                            if (object.custom_field_data.hasOwnProperty(prop) && typeof object.custom_field_data[prop] == "string" && (object.custom_field_data[prop].match(regexIso8601))) {
                                // Apply each element to the Date function
                                object.custom_field_data[prop] = new Date(object.custom_field_data[prop]);
                            }
                        }
                    }
                    else if (typeof  object[property] == "object" && object[property] != null) {
                        object[property] = convertDateFields(object[property]);
                    }
                    else {
                            try {
                                if (object[property].match(regexIso8601)) {
                                    //var date = object[property];

                                    // expecting MySQL date
                                    // Split timestamp into [ Y, M, D, h, m, s ]
                                    //var t = date.split(/[- :]/);

                                    // Apply each element to the Date function
                                    //if (t[3] == 0 && t[4] == 0 && t[5] == 0) {
                                    //    // Since hour, min, second are all zero, we assume its a date only field, so timezone
                                    //    // conversion is not required
                                    //    object[date_fields[i]] = new Date(t[0], (t[1] - 1), t[2], t[3], t[4], t[5]);
                                    //}
                                    //else {
                                    object[property] = new Date(object[property]);
                                    //}
                                }
                            }
                            catch (e) {

                            }
                    }
                }
            }

            return object;
        }

        function isArray(object) {
            return Object.prototype.toString.call(object) === '[object Array]'
        }

        function handleError(r) {
            if (typeof  r.data != "object") {
                // HTML response got. Probably error or 404 page
                // TODO: Response not getting modified when received in controller
                r.data = {
                        "status": "fail",
                        "message": "Oops, a server side error occurred. Please try again."
                };

                Notification.error("Oops, a server side error occurred. Please try again.");

                return r;
            }

            if (r.data != undefined) {
                // Handle token error in response
                if (r.data.error_name == "token_absent" || r.data.error_name == "token_expired" ||
                    r.data.error_name == "token_invalid" || r.data.error_name == "user_not_found") {
                    $state.go("auth");
                    return r;
                }
            }

            if (r.data.error_name == "internal_server_error" || r.data.error_name == "token_mismatch") {
                Notification.error(r.data.message);
            }

            var refreshToken = r.headers('Authorization');
            if (refreshToken != null && typeof refreshToken != "undefined") {
                $auth.setToken(refreshToken.replace('Bearer ', ''));
            }
            return r;
        }
    }])
    .service('$list', ['$api', 'Notification', '$uibModal', function ($api, Notification, $uibModal) {
        this.edit = function(list_id) {
            var modalInstance = $uibModal.open({
                templateUrl: '/modules/core/lists/update.html',
                controller: "ListsController",
                resolve: {
                    list_id: function(){
                        return list_id;
                    }
                }
            });

            return modalInstance.result.then(function(result) {
                if (result != null) {
                    return result;
                }
            });
        };

        this.get = function(list_id) {
            // Fetch list
            return $api.get("list/"+list_id).then(function(response) {
                return response.data.data;
            });
        }
    }])
    .controller('ListsController', ['$auth', '$scope', '$rootScope', '$translate', '$api', 'Notification', '$uibModalInstance', 'list_id', function ($auth, $scope, $rootScope, $translate, $api, Notification, $uibModalInstance, list_id) {
        $rootScope.busy = true;

        // Fetch list
        $api.get("list/"+list_id).then(function(response) {
            if(response.data.status == "success") {
                $scope.list = response.data.data;
            }
            else {
                // Close modal if there was an error
                $scope.closeModal(null);
            }
        }, function(response) {
            // Close modal if there was an error
            $scope.closeModal(null);
        }).finally(function() {
            $rootScope.busy = false;
        });

        //region Modal functions
        $scope.clear = function() {
            $scope.response = null;
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.closeModal = function (result) {
            $uibModalInstance.close(result);
        };
        //endregion

        $scope.addMore = function () {
            $scope.list.items.push("");
        };

        $scope.removeItem = function ($index) {
            $scope.list.items.splice($index, 1);
        };

        $scope.update = function () {
            $rootScope.busy = true;
            $api.post("list/"+list_id, $scope.list).then(function (response) {
                if (response.data.status == "success") {
                    Notification.success(response.data.message);
                    $scope.closeModal($scope.list);
                }
            }, function (response) {
                $scope.response = response.data;
            }).finally(function(){
                $rootScope.busy = false;
            });
        };
    }])
    .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', '$http', '$auth', '$state', "$rootScope", 'tmhDynamicLocale', '$api',
    function ($scope, $translate, $localStorage, $window, $http, $auth, $state, $rootScope, tmhDynamicLocale, $api) {
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        if (isIE) {
            angular.element($window.document.body).addClass('ie');
        }

        if (isSmartDevice($window)) {
            angular.element($window.document.body).addClass('smart');
            $rootScope.isSmart  = true;
        }

        // config
        $scope.app = {
            name: 'SnapHRM',
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

        // Get settings from local storage
        if (angular.isDefined($localStorage.app_settings)) {
            $scope.app.app_settings = $localStorage.app_settings;
            $scope.app.copyright = $localStorage.copyright;
            $scope.app.info = $localStorage.info;
        }

        if (angular.isDefined($localStorage.user)) {
            $rootScope.user = $localStorage.user;

            // Refresh user data
            $api.get("employee/"+$localStorage.user.id, {
                "fields": "id|name|email|profile_image|profile_image_url|permissions"
            }).then(function(response) {
                $rootScope.user = response.data.data;
                $localStorage.user = response.data.data;
            })
        }

        // Get common app data
        $http.get("/api/app").then(function (response) {
            if (response.data.superadmin) {
                $scope.app.info = response.data.global_settings;
            }
            else {
                $scope.app.info = response.data.company;
            }

            $scope.app.app_settings = response.data.settings;
            $scope.app.copyright = response.data.copyright;
            $localStorage.app_settings = $scope.app.app_settings;
            $localStorage.copyright = $scope.app.copyright;
            $localStorage.info = $scope.app.info;
        });


        // save settings to local storage
        if (angular.isDefined($localStorage.settings)) {
            $scope.app.settings = $localStorage.settings;
        }
        else {
            $localStorage.settings = $scope.app.settings;
        }

        $rootScope.datepickerOptions = { "class": "datepicker", "showWeeks": false };


        // angular translate
        $scope.lang = {isopen: false};
        $scope.langs = [
            {
                name: "English",
                language: "en",
                locale: "en-us"
            },{
                name: "English (India)",
                language: "en",
                locale: "en-in"
            }];
        $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
        $rootScope.langKey = $translate.proposedLanguage();
        tmhDynamicLocale.set($localStorage.locale);
        $scope.setLang = function (langKey, $event) {
            // set the current lang
            $scope.selectLang = $scope.langs[langKey].name;
            // You can change the language during runtime
            $translate.use($scope.langs[langKey].language);
            tmhDynamicLocale.set($scope.langs[langKey].locale);
            $localStorage.locale = $scope.langs[langKey].locale;
            $rootScope.langKey = langKey;
            //window.location.reload();
        };

        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        $scope.getInclude = function (url) {
            url = url.replace(/^\//g, "");

            return url + "?v=" + hashes[url];
        };

    }]);
