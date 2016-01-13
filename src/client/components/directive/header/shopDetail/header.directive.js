var app = angular.module('webApp');

app.directive('cocoShopDetailHeader', () => {
    return {
        templateUrl: './components/directive/header/shopDetail/header.html',
        restrict: 'E'
    };
});
