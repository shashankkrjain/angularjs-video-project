'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
    .filter('fromNow', function () {
        return function (date) {
            if (!date) {
                return date;
            }
            else {
                return moment(date).fromNow();
            }
        }
    });