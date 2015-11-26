var app = angular.module('webApp');
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider) {
    $stateProvider
        .state('users', {
            url: '/admin/users',
            views: {
                '': {
                    templateUrl: './app/admin/users/users.html',
                    controller: 'UsersController'
                }
            }
        })
        .state('adminNewUser', {
            url: '/admin/users/adminNewUser',
            views: {
                '': {
                    templateUrl: './app/admin/users/adminNewUser.html',
                    controller: 'UsersController'
                }
            }
    });
}]);
