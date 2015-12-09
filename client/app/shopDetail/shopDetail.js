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
            },
            auth: true
        })
        .state('shopDetail.main', {
            url: '/main/:itemid',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.main.html',
                    controller: 'ShopDetailController',
                }
            },
            auth: true
        })
        .state('shopDetail.photos', {
            url: '/photos',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.photos.html',
                    controller: 'ShopDetailController'
                }
            },
            auth: true
        })
        .state('shopDetail.reviews', {
            url: '/reviews',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.reviews.html',
                    controller: 'ShopDetailController'
                }
            },
            auth: true
        })
        .state('shopDetail.map', {
            url: '/map',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.map.html',
                    controller: 'ShopDetailController'
                }
            },
            auth: true
        });
}]);
