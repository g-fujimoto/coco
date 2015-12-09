angular.module('webApp')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                views: {
                    '': {
                        templateUrl: './app/admin/adminLogin/adminLogin.html',
                        controller: 'AdminLoginController'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    }]);
