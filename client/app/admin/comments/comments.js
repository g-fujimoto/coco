var app = angular.module('webApp');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider) {
    $stateProvider
        .state('comments', {
            url: '/admin/comments',
            views: {
                '': {
                    templateUrl: './app/admin/comments/comments.html',
                    controller: 'CommentsController'
                }
            }
        })
        .state('adminNewComments', {
            url: '/admin/comments/adminNewComments',
            views: {
                '': {
                    templateUrl: './app/admin/comments/adminNewComments.html',
                    controller: 'CommentsController'
                }
            }
        });
}]);
