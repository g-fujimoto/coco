angular.module('webApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('shopDetail', {
            url: '/shopDetail',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.html',
                    controller: 'ShopDetailController'
                }
            }
        })
        .state('shopDetail.main', {
            url: '/main',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.main.html',
                    controller: 'ShopDetailController'
                }
            }
        })
        .state('shopDetail.photos', {
            url: '/photos',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.photos.html',
                    controller: 'ShopDetailController'
                }
            }
        })
        .state('shopDetail.reviews', {
            url: '/reviews',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.reviews.html',
                    controller: 'ShopDetailController'
                }
            }
        })
        .state('shopDetail.map', {
            url: '/map',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.map.html',
                    controller: 'ShopDetailController'
                }
            }
        });
}]);
