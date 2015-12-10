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
        $urlRouterProvider.when('/', '');
    }])
    .run(['$rootScope', '$state', '$http', '$Users', ($rootScope, $state, $http, $Users) => {

        $rootScope.$on('$stateChangeStart', (e, toState, toParams, fromState, fromParams) => {

            $Users.stateCheck();
            console.log('check');
            console.log($rootScope.loginUser);
        });
    }]);
