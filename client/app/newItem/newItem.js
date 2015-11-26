angular.module('webApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('newItem', {
            url: '/newItem',
            views: {
                '': {
                    templateUrl: './app/newItem/newItem.html',
                    controller: 'NewItemController'
                }
            }
        });
}]);
