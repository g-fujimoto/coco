'use strict';

angular.module('webApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/',
        views: {
            '': {
                templateUrl: './app/login/login.html',
                controller: 'LoginController'
            }
        }
    });
}]);