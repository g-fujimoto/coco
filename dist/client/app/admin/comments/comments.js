'use strict';

var app = angular.module('webApp');

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
    $stateProvider.state('comments', {
        url: '/admin/comments',
        views: {
            '': {
                templateUrl: './app/admin/comments/comments.html',
                controller: 'CommentsController'
            }
        },
        params: {
            alert: null,
            admin: true
        }
    }).state('adminNewComment', {
        url: '/admin/comments/new',
        views: {
            '': {
                templateUrl: './app/admin/comments/new.html',
                controller: 'CommentsController'
            }
        },
        params: {
            alert: null,
            admin: true
        }
    });
}]);