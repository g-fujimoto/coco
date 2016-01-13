'use strict';

var app = angular.module('webApp');

app.directive('cocoShopDetailHeader', function () {
    return {
        templateUrl: './components/directive/header/shopDetail/header.html',
        restrict: 'E'
    };
});