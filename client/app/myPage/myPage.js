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
            }
        })
        .state('myPage.went', {
            url: '/went',
            views: {
                '': {
                    templateUrl: './app/myPage/myPage.went.html',
                    controller: 'MyPageController'
                }
            }
        })
        .state('myPage.wantGo', {
            url: '/wantGo',
            views: {
                '': {
                    templateUrl: './app/myPage/myPage.wantGo.html',
                    controller: 'MyPageController'
                }
            }
        })
        .state('myPage.recommend', {
            url: '/recommend',
            views: {
                '': {
                    templateUrl: './app/myPage/myPage.recommend.html',
                    controller: 'MyPageController'
                }
            }
        })
        .state('reviews', {
            url: '/shopDetail',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.html',
                    controller: 'ShopDetailController'
                }
            }
        });
}]);
