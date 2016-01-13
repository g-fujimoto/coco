'use strict';

angular.module('webApp').directive('checkAdded', function () {
    return function (scope, element, attr) {
        var data = angular.fromJson(attr.checkAdded);
        if (data.item) {
            if (_.contains(scope.$root.loginUser.recommendItems, data.item._id)) {
                scope.checkRecommend = true;
            } else {
                scope.checkRecommend = false;
            }
        } else {
            if (_.contains(scope.$root.loginUser.recommendItems, data._id)) {
                scope.checkRecommend = true;
            } else {
                scope.checkRecommend = false;
            }
        }
    };
}).directive('checkLiked', function () {
    return function (scope, element, attr) {
        var data = angular.fromJson(attr.checkLiked);
        if (data.item) {
            if (_.contains(data.itemLikesUsers, scope.$root.loginUser._id)) {
                scope.checkRecommend = true;
            } else {
                scope.checkRecommend = false;
            }
        } else {
            if (_.contains(scope.$root.loginUser.recommendItems, data._id)) {
                scope.checkRecommend = true;
            } else {
                scope.checkRecommend = false;
            }
        }
    };
});