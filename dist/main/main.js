'use strict';

angular.module('webApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
        url: '/main',
        views: {
            '': {
                templateUrl: './app/main/main.html',
                controller: 'MainController'
            }
        },
        params: {
            login: true,
            fromLogin: null
        }
    });
}]);