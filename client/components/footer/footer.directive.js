var app = angular.module('webApp');

app.directive('cocoFooter', function() {
    return {
        restrict: 'E',
        templateUrl: './components/footer/footer.html'
    };
});
