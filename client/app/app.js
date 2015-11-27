// Create Application
var app = angular.module('webApp', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngFileUpload'
    // 'ngMessages',
    // 'ngCookies'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}]);
