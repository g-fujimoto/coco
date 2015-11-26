var app = angular.module('webApp');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider) {
    $stateProvider
        .state('items', {
            url: '/admin/items',
            views: {
                '': {
                    templateUrl: './app/admin/items/items.html',
                    controller: 'ItemsController'
                }
            }
        })
        .state('newItem', {
            url: '/admin/items/newItem',
            views: {
                '': {
                    templateUrl: './app/admin/items/newItem.html',
                    controller: 'ItemsController'
                }
            }
        });
}]);
