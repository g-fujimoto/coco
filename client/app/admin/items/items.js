
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
