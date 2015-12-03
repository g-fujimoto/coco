angular.module('webApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('shopDetail', {
            url: '/shopDetail/:itemid',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.html',
                    controller: 'ShopDetailController',
                }
            }
        })
        .state('reviews', {
            url: '/shopDetail/reviews',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.reviews.html',
                    controller: 'ShopDetailController',
                }
            }
        });
}]);
