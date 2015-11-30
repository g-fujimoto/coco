angular.module('webApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('myPage', {
            url: '/myPage',
            views: {
                '': {
                    templateUrl: './app/myPage/myPage.profile.html',
                    controller: 'MyPageController'
                }
            }
        });
}]);
