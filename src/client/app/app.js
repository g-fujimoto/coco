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
    .run(['$rootScope', '$state', '$http', '$Users', '$timeout', '$location', '$window', ($rootScope, $state, $http, $Users, $timeout, $location, $window) => {
        $rootScope.logout = $Users.logout;


        $rootScope.$on('$stateChangeStart', (e, toState, toParams, fromState, fromParams) => {
            //shopDetailでitem._idがundefinedの場合 -> searchに飛ばす
            if(toState.name === 'shopDetail.main' || toState.name === 'shopDetail.photos' || toState.name === 'shopDetail.reviews' || toState.name === 'shopDetail.map') {
                if(!toParams.item) {
                    $window.location.href = '/#/search';
                }
            }

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
