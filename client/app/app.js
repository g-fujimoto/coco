// Create Application
const app = angular.module('webApp', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'ngFileUpload',
    'ngResource',
    'cfp.loadingBar'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}])
.run(['$rootScope', '$state', function($rootScope) {
    $rootScope.$on('$stateChangeStart', (e, toState, toParams, fromState, fromParams) => {
        console.log(e, toState, fromState);
    });
}]);
