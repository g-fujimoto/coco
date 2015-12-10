angular.module('webApp')
    .controller('LoginController', ['$scope', '$rootScope', '$Users', ($scope, $rootScope, $Users) => {
        // ----------------------------------------------- $scope(value) ----------------------------------------------------//
                $scope.$root.error = false;
                $rootScope.isLogin = false;
        // ----------------------------------------------- $scope(function) ----------------------------------------------------//
                $scope.login = () => {
                    $Users.login($scope, false);
                };

                $rootScope.logout = () => {
                    $Users.logout($scope, false);
                };

    }]);
