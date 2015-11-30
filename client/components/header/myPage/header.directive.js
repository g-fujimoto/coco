var app = angular.module('webApp');

app.directive('cocoMyPageHeader', () => {
    return {
        templateUrl: './components/header/myPage/header.html',
        restrict: 'E'
    };
});
