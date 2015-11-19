var app = angular.module('webApp');

app.directive('ngFooter', function() {
    return {
        restrict: 'E',
        templateUrl: './components/footer/footer.html'
    };
});
