'use strict';

angular.module('webApp').directive('cocoSidebar', function () {
    return {
        templateUrl: './components/directive/sidebar/sidebar.html',
        restrict: 'E'
    };
}).directive('cocoSidebarMin', function () {
    return {
        templateUrl: './components/directive/sidebar/sidebarMin.html',
        restrict: 'E'
    };
});