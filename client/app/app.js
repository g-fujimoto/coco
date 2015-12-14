// Create Application
angular.module('webApp', [
        'ui.router',
        'ui.bootstrap',
        'ngAnimate',
        'ngFileUpload',
        'ngResource',
        'cfp.loadingBar',
        'uiGmapgoogle-maps'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$uiViewScrollProvider', 'uiGmapGoogleMapApiProvider',
        ($stateProvider, $urlRouterProvider, $uiViewScrollProvider, GoogleMapApiProviders) => {
            $urlRouterProvider.when('/', '');
            $uiViewScrollProvider.useAnchorScroll();

            GoogleMapApiProviders.configure({
                china: true
            });

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
                var stateName = toState.name;
                if($rootScope.adminLoginUser) {
                    $Users.stateCheck(true, stateName);
                } else {
                    $Users.stateCheck(false, stateName);
                }
            }
        });
    }]);
