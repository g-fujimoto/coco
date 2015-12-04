// Create Application
const app = angular.module('webApp', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngFileUpload',
    'ngResource',
    'cfp.loadingBar'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}]);
