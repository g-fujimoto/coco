angular.module('webApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            views: {
                '': {
                    templateUrl: './app/main/main.html',
                    controller: 'MainController'
                }
            }
        });
}]);
