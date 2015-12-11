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
            params: {
                login: true,
                item : null
            }
        })
        .state('shopDetail.main', {
            url: '/main/:itemid',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.main.html',
                    controller: 'ShopDetailController'
                }
            },
            params: {
                login: true,
                item : null
            }
        })
        .state('shopDetail.photos', {
            url: '/photos',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.photos.html',
                    controller: 'ShopDetailController'
                }
            },
            params: {
                login: true,
                item : null
            }
        })
        .state('shopDetail.reviews', {
            url: '/reviews/:itemid',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.reviews.html',
                    controller: 'ShopDetailController'
                }
            },
            params: {
                login: true,
                item : null
            }
        })
        .state('shopDetail.map', {
            url: '/map',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.map.html',
                    controller: 'ShopDetailController'
                }
            },
            params: {
                login: true,
                item : null
            }
        });
}]);
