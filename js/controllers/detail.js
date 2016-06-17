'use strict';

/* Controllers */

angular.module('app')
    .controller('VideoController', function ($scope, $http, $state, $auth, $sessionStorage, $stateParams, $rootScope, $api, $sce, Notification, $localStorage) {

        $rootScope.pageName = "Crossover Video Detail";

        $scope.video = {};
        $scope.videoId = $stateParams.id;
        $scope.ratingReadOnly = "false";
        $scope.videoAPI = null;
        $scope.source = null;



        // Side videos
        $scope.videos = []; // Videos from the API
        $scope.videoAPIs = []; // List of API Objects for each video
        $scope.sources = []; // Video sources as required by plugin

        // Get current video details
        $api.get("/video", {videoId : $scope.videoId}).then(function (response) {
            if(response.data.status == 'success') {
                $scope.video = response.data.data;
                $scope.source = [
                    {src: $sce.trustAsResourceUrl($scope.video.url), type: "video/mp4"}
                ];

                var sumRating = 0;
                for (var j = 0; j < $scope.video.ratings.length; j++) {
                    sumRating += $scope.video.ratings[j];
                }

                if ($scope.video.ratings.length > 0) {
                    $scope.video.avgRating = sumRating / $scope.video.ratings.length;
                }
                else {
                    $scope.video.avgRating = 0;
                }

                startWatch();
            }
            else {
                $state.go("404");
            }
        }, function(response) {
            $state.go("404");
        });

        // Get side videos list
        $api.get("/videos", {skip: Math.round(Math.random()*10)}).then(function (response) {
            if (response.data.status == "success") {
                var newVideos = response.data.data;

                // Push new videos into scope's video list
                for (var k = 0; k < newVideos.length; k++) {
                    $scope.videos.push(newVideos[k]);
                }

                // Build sources array, calculate ratings, initialize API objects for videos
                for (var i = 0; i < $scope.videos.length; i++) {
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
            }
        });

        // Watch the ratings variable and rate
        function startWatch() {
            $scope.$watch("video.avgRating", function(newValue, oldValue) {
                if (oldValue != newValue) {
                    // Check if already rated
                    if ($localStorage.ratedVideos == undefined) {
                        // Initialize
                        $localStorage.ratedVideos = [];
                    }
                    else {
                        // If videoId is in rated videos, return with error
                        if ($localStorage.ratedVideos.indexOf($scope.videoId) != -1) {
                            Notification.error("You have already rated this video");
                        }
                        else {
                            $api.post("/video/ratings", {videoId : $scope.videoId, rating: newValue}).then(function (response) {
                                if (response.data.status == "success") {
                                    Notification.success("Rating saved successfully");
                                    $localStorage.ratedVideos.push($scope.videoId);
                                }
                            });
                        }
                    }
                }
            })
        }

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

        $scope.onSinglePlayerReady = function($API) {
            $scope.videoAPI = $API;
        };

        $scope.onSingleUpdateState= function($API) {
            for (var i = 0; i < $scope.videoAPIs.length; i++) {
                $scope.videoAPIs[i].pause();
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
                $scope.videoAPI.pause();
            }
        }
    });