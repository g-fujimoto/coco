angular.module('webApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/',
            views: {
                '': {
                    templateUrl: './app/login/login.html',
                    controller: 'LoginController'
                }
            }
        });
}])
.run(['$rootScope', '$state', '$http', '$Users', ($rootScope, $state, $http, $Users) => {
    $rootScope.$on('$stateChangeStart', () => {
        $rootScope.isLogin = false;
    });
}]);
