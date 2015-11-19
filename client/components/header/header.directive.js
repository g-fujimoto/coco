var app = angular.module('webApp');

app.directive('ngHeader', function() {
    return {
        templateUrl: './components/header/header.html',
        restrict: 'E'
    };
});
