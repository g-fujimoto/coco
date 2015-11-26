angular.module('webApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('search', {
            url: '/search',
            views: {
                '': {
                    templateUrl: './app/search/search.html',
                    controller: 'MainController'
                }
            }
        });
}]);
