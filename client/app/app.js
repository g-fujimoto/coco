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
    .run(['$rootScope', '$state', '$http', ($rootScope, $state, $http) => {
        $rootScope.$on('$stateChangeStart', (e, toState, toParams, fromState, fromParams) => {
            $http.post(
                '/api/users/stateCheck',
                {}
            )
            .success((data) => {
                if(!data.isLogin) {
                    if(toState.auth) {
                        $state.go('login');
                        e.preventDefault();
                    }
                } else {
                    $rootScope.isLogin = true;
                }
            });
        });
    }]);
