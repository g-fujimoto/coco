var app = angular.module('webApp');
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('users', {
            url: '/admin/users',
            views: {
                '': {
                    templateUrl: './app/admin/users/users.html',
                    controller: 'usersController'
                }
            }
        })
        .state('newUser', {
            url: '/admin/users/newUser',
            views: {
                '': {
                    templateUrl: './app/admin/users/newUser.html',
                    controller: 'usersController'
                }
            }
    });
}]);
