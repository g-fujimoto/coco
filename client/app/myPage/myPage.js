angular.module('webApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('myPage', {
            url: '/myPage',
            views: {
                '': {
                    templateUrl: './app/myPage/myPage.html',
                    controller: 'MyPageController'
                }
            }
        })
        .state('myPage.profile', {
            url: '/profile',
            views: {
                '': {
                    templateUrl: './app/myPage/myPage.profile.html',
                    controller: 'MyPageController'
                }
            },
            auth: true
        })
        .state('myPage.went', {
            url: '/went',
            views: {
                '': {
                    templateUrl: './app/myPage/myPage.went.html',
                    controller: 'MyPageController'
                }
            },
            auth: true
        })
        .state('myPage.wantGo', {
            url: '/wantGo',
            views: {
                '': {
                    templateUrl: './app/myPage/myPage.wantGo.html',
                    controller: 'MyPageController'
                }
            },
            auth: true
        })
        .state('myPage.recommend', {
            url: '/recommend',
            views: {
                '': {
                    templateUrl: './app/myPage/myPage.recommend.html',
                    controller: 'MyPageController'
                }
            },
            auth: true
        })
        .state('reviews', {
            url: '/shopDetail',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.html',
                    controller: 'ShopDetailController'
                }
            },
            auth: true
        });
}]);
