angular.module('webApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('newItem', {
            url: '/newItem',
            views: {
                '': {
                    templateUrl: './app/newItem/newItem.html',
                    controller: 'NewItemController'
                }
            },
            auth: true
        })
        .state('newItem.regist', {
            url: '/regist',
            views: {
                '' : {
                    controller: 'NewItemController',
                    templateUrl: './app/newItem/newItem.regist.html'
                }
            },
            params: {
                confirmData: null
            },
            auth: true
        })
        .state('newItem.confirm', {
            url: '/confirm',
            views: {
                '' : {
                    controller: 'NewItemController',
                    templateUrl: './app/newItem/newItem.confirm.html'
                }
            },
            params: {
                newData: null
            },
            auth: true
        })
        .state('newItem.complete', {
            url: '/complete',
            views: {
                '': {
                    controller: 'NewItemController',
                    templateUrl: './app/newItem/newItem.complete.html'
                }
            },
            params: {

            },

            auth: true
        });
}]);
