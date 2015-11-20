// Create Application
var app = angular.module('webApp', [
    'ui.router',
    // 'ngMessages',
    'ui.bootstrap'
    // 'ngAnimate',
    // 'ngFileUpload',
    // 'ngCookies'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            views: {
                'pages': {
                    templateUrl: './app/main/main.html',
                    controller: 'MainController'
                }
            }
        })
        .state('admin', {
            url: '/admin',
            views: {
                'pages': {
                    templateUrl: './app/admin/admin.html',
                    controller: 'AdminController'
                },
                'adminPages': {
                    templateUrl: './app/admin/items/items.html',
                    controller:  'ItemsController'
                }
            }
        })
        .state('admin.items', {
            url: '/items',
            views: {
                'pages': {
                    templateUrl: './app/admin/items/items.html'
                }
            }
        });

    $urlRouterProvider.otherwise('/');
}]);
