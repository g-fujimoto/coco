// Create Application
angular.module('webApp', [
        'ui.router',
        'ui.bootstrap',
        'ngAnimate',
        'ngFileUpload',
        'ngResource',
        'cfp.loadingBar'
    ])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/');
    }])
    .run(['$rootScope', '$state', '$Login', ($rootScope, $state, $Login) => {
        $rootScope.$on('$stateChangeStart', (e, toState) => {
            $Login.stateCheck();
        });
    }]);
