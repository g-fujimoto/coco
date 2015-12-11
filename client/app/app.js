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
    .run(['$rootScope', '$state', '$http', '$Users', '$timeout', ($rootScope, $state, $http, $Users, $timeout) => {
        $rootScope.logout = $Users.logout;
        $rootScope.$on('$stateChangeStart', (e, toState, toParams, fromState, fromParams) => {
            if(toState.name === 'admin') {
                $rootScope.isLogin        = false;
                $rootScope.loginUser      = false;
                $rootScope.isAdminLogin   = false;
                $rootScope.adminLoginUser = false;
                $timeout(() => {
                    $state.go('admin');
                });
            } else if(toState.name === 'login') {
                $rootScope.isLogin        = false;
                $rootScope.loginUser      = false;
                $rootScope.isAdminLogin   = false;
                $rootScope.adminLoginUser = false;
                $timeout(() => {
                    $state.go('login');
                });
            } else {
                if(toParams.admin === true) {
                    $Users.stateCheck(true);
                } else {
                    $Users.stateCheck();
                }
            }
        });
    }]);
