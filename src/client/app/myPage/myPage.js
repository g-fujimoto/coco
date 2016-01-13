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
            },
            params : {
                login: true
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
            params: {
                login: true
            }
        })
        .state('myPage.went', {
            url: '/went',
            views: {
                '': {
                    templateUrl: './app/myPage/myPage.went.html',
                    controller: 'MyPageController'
                }
            },
            params: {
                login: true
            }
        })
        .state('myPage.wantGo', {
            url: '/wantGo',
            views: {
                '': {
                    templateUrl: './app/myPage/myPage.wantGo.html',
                    controller: 'MyPageController'
                }
            },
            params: {
                login: true
            }
        })
        .state('myPage.recommend', {
            url: '/recommend',
            views: {
                '': {
                    templateUrl: './app/myPage/myPage.recommend.html',
                    controller: 'MyPageController'
                }
            },
            params: {
                login: true
            }
        })
        .state('reviews', {
            url: '/shopDetail',
            views: {
                '': {
                    templateUrl: './app/shopDetail/shopDetail.html',
                    controller: 'ShopDetailController'
                }
            },
            params: {
                login: true
            }
        });
}]);
