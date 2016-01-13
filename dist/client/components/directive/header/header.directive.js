'use strict';

var app = angular.module('webApp');

app.directive('cocoHeader', function () {
    return {
        templateUrl: './components/directive/header/header.html',
        restrict: 'E'
    };
});
app.directive('cocoMainHeader', function () {
    return {
        templateUrl: './components/directive/header/mainHeader.html',
        restrict: 'E'
    };
});