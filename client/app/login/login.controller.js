angular.module('webApp')
    .controller('LoginController', ['$scope', '$Users', ($scope, $Users) => {
        // ----------------------------------------------- $scope(value) ----------------------------------------------------//
                $scope.$root.error = false;

        // ----------------------------------------------- $scope(function) ----------------------------------------------------//
                $scope.login = () => {
                    $Users.login($scope, false);
                };

    }]);
