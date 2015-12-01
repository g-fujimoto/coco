var app = angular.module('webApp');

app.directive('cocoMyPageHeader', () => {
    return {
        templateUrl: './components/directive/header/myPage/header.html',
        restrict: 'E'
    };
});
