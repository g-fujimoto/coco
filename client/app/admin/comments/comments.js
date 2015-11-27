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
        .state('adminNewComment', {
            url: '/admin/comments/adminNewComment',
            views: {
                '': {
                    templateUrl: './app/admin/comments/adminNewComment.html',
                    controller: 'CommentsController'
                }
            }
        });
}]);
