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
        })
        .state('newItem.regist', {
            url: '/regist',
            views: {
                '' : {
                    controller: 'NewItemController',
                    templateUrl: './app/newItem/newItem.regist.html'
                }
            }
        })
        .state('newItem.confirmation', {
            url: '/confirm',
            views: {
                '' : {
                    controller: 'NewItemController',
                    templateUrl: './app/newItem/newItem.confirm.html'
                }
            }
        });
}]);
