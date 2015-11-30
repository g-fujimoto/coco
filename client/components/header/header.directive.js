var app = angular.module('webApp');

app.directive('cocoHeader', function() {
    return {
        templateUrl: './components/header/header.html',
        restrict: 'E'
    };
});
