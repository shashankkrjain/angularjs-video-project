'use strict';

/* Controllers */

angular.module('app')
    .controller('VideoController', function ($scope, $http, $state, $auth, $sessionStorage, $stateParams, $rootScope, $api, $sce) {

        $rootScope.pageName = "Crossover Video Detail";

        $scope.video = {};
        $scope.videoId = $stateParams.id;

        $scope.getVideo = function() {
            $api.get("video", {videoId : $scope.videoId}).then(function (response) {
                if(response.data.status == 'success') {
                    $scope.video = response.data.data;
                }
            });
        };

        $scope.videos = []; // Videos from the API
        $scope.videoAPIs = []; // List of API Objects for each video
        $scope.sources = []; // Video sources as required by plugin
        $scope.skip = 0; // Pointer
        $scope.reachedEnd = false; // Indicated we have reached end of results, so stop scroll

        // This function fetched video results from API according to current pointer
        $scope.paginate = function () {
            $scope.busy = true;
            $api.get("video", {videoId: $scope.videoId}).then(function (response) {
                $scope.busy = false;
                if (response.data.status == "success") {
                    if (response.data.data.length == 0) {
                        $scope.reachedEnd = true;
                    }
                    else {
                        var newVideos = response.data.data;

                        // Push new videos into scope's video list
                        for (var k = 0; k < newVideos.length; k++) {
                            $scope.videos.push(newVideos[k]);
                        }

                        // Build sources array, calculate ratings, initialize API objects for videos
                        for (var i = $scope.skip; i < $scope.videos.length; i++) {
                            $scope.videoAPIs[i] = undefined;
                            $scope.sources[i] = [
                                {src: $sce.trustAsResourceUrl($scope.videos[i].url), type: "video/mp4"}
                            ];
                            var sumRating = 0;
                            for (var j = 0; j < $scope.videos[i].ratings.length; j++) {
                                sumRating += $scope.videos[i].ratings[j];
                            }
                            if ($scope.videos[i].ratings.length > 0) {
                                $scope.videos[i].avgRating = sumRating / $scope.videos[i].ratings.length;
                            }
                            else {
                                $scope.videos[i].avgRating = 0;
                            }
                        }
                        // Update to load next set of records
                        $scope.skip += 10;
                    }
                }
            });
        };

        $scope.paginate();

        $scope.config = {
            preload: "none",
            autoHide: false,
            autoHideTime: 3000,
            autoPlay: false,
            theme: "/libs/angular/videogular-themes-default/videogular.min.css",
            plugins: {
                controls: {
                    autoHide: true,
                    autoHideTime: 5000
                }
            }
        };

        $scope.onPlayerReady = function($index, $API) {
            $scope.videoAPIs[$index] = $API;
        };

        $scope.onUpdateState = function($index, $state) {
            if ($state == "play") {
                for (var i = 0; i < $scope.videoAPIs.length; i++) {
                    if (!(i == $index)) {
                        $scope.videoAPIs[i].pause();
                    }
                }
            }
        }
    });