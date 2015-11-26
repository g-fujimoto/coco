var app = angular.module('webApp');

app.directive('ngMainHeader', function() {
    return {
        templateUrl: './components/header/mainHeader.html',
        restrict: 'E'
    };
})
.directive('ngHeader', function() {
    return {
        templateUrl: './components/header/header.html',
        restrict: 'E'
    };
});
