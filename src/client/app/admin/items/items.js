var app = angular.module('webApp');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('items', {
            url: '/admin/items',
            views: {
                '': {
                    templateUrl: './app/admin/items/items.html',
                    controller: 'ItemsController'
                }
            },
            params: {
                alert: null,
                admin: true
            }
        })
        .state('adminNewItem', {
            url: '/admin/items/new',
            views: {
                '': {
                    templateUrl: './app/admin/items/new.html',
                    controller: 'ItemsController'
                }
            },
            params: {
                alert: null,
                admin: true
            }
        });
}]);
