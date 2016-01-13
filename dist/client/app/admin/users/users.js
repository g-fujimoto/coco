'use strict';

var app = angular.module('webApp');
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
    $stateProvider.state('users', {
        url: '/admin/users',
        views: {
            '': {
                templateUrl: './app/admin/users/users.html',
                controller: 'UsersController'
            }
        },
        params: {
            alert: null,
            admin: true
        }
    }).state('adminNewUser', {
        url: '/admin/users/new',
        views: {
            '': {
                templateUrl: './app/admin/users/new.html',
                controller: 'UsersController'
            }
        },
        params: {
            alert: null,
            admin: true
        }
    });
}]);