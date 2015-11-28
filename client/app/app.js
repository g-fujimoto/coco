// Create Application
const app = angular.module('webApp', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngFileUpload',
    'ngResource'
    // 'ngMessages',
    // 'ngCookies'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}]);
