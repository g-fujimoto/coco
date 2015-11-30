var app = angular.module('webApp');

app.directive('cocoMyPageHeader', function() {
    return {
        templateUrl: './components/header/myPage/header.html',
        restrict: 'E'
    };
});
