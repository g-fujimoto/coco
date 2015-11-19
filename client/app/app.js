// Create Application
var app = angular.module('webApp', [
    'ui.router'
    // 'ngMessages',
    // 'ui.bootstrap',
    // 'ngAnimate',
    // 'ngFileUpload',
    // 'ngCookies'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            views: {
                '': {
                    templateUrl: './app/main/main.html',
                    controller: 'MainController'
                }
            }
        })
        .state('admin', {
            url: '/admin',
            views: {
                '': {
                    templateUrl: './app/admin/admin.html',
                    controller: 'AdminController'
                }
            }
        })
        .state('admin.items', {
            url: '/admin/items',
            views: {
                '': {
                    templateUrl: './app/admin/items/items.html',
                    controller:  'ItemsController'
                }
            }
        });
    $urlRouterProvider.otherwise('/');
}]);
