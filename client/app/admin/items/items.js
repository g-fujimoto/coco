
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
        .state('adminNewItem', {
            url: '/admin/items/adminNewItem',
            views: {
                '': {
                    templateUrl: './app/admin/items/adminNewItem.html',
                    controller: 'ItemsController'
                }
            }
    });
}]);
