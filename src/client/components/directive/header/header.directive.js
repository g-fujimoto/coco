var app = angular.module('webApp');

app.directive('cocoHeader', () => {
    return {
        templateUrl: './components/directive/header/header.html',
        restrict: 'E'
    };
});
app.directive('cocoMainHeader', () => {
    return {
        templateUrl: './components/directive/header/mainHeader.html',
        restrict: 'E'
    };
});
