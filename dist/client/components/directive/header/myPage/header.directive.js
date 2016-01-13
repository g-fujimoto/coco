'use strict';

var app = angular.module('webApp');

app.directive('cocoMyPageHeader', function () {
    return {
        templateUrl: './components/directive/header/myPage/header.html',
        restrict: 'E'
    };
});