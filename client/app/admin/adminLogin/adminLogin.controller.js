angular.module('webApp')
    .controller('AdminLoginController', ['$scope', '$rootScope', '$Users', function($scope, $rootScope, $Users) {
// ----------------------------------------------- $scope(value) ----------------------------------------------------//
        $rootScope.error = false;
        $rootScope.isLogin = false;
// ----------------------------------------------- $scope(function) ----------------------------------------------------//
        $scope.login = () => {
            $Users.login($scope, true);
        };

        $rootScope.logout = () => {
            $Users.logout($scope, true);
        };
    }]);
