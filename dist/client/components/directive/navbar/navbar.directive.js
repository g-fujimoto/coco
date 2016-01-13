'use strict';

angular.module('webApp').directive('cocoNavbar', function () {
    return {
        templateUrl: './components/directive/navbar/navbar.html',
        restrict: 'E'
    };
});