// Create Application
var app = angular.module('webApp', [
    'ui.router',
    // 'ngMessages',
    'ui.bootstrap'
    // 'ngAnimate',
    // 'ngFileUpload',
    // 'ngCookies'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}]);
