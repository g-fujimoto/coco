angular.module('webApp')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                views: {
                    '': {
                        templateUrl: './app/admin/login/login.html',
                        controller: 'LoginController'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
}]);
