angular.module('webApp')
    .controller('LoginController', ['$scope', '$rootScope', '$Users', ($scope, $rootScope, $Users) => {
        // ----------------------------------------------- $scope(value) ----------------------------------------------------//
        // ----------------------------------------------- $scope(function) ----------------------------------------------------//
                $scope.login = () => {
                    $Users.login($scope, false);
                };
    }]);
