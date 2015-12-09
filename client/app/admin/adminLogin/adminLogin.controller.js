angular.module('webApp')
    .controller('AdminLoginController', ['$scope', '$Users', function($scope, $Users) {
// ----------------------------------------------- $scope(value) ----------------------------------------------------//
        $scope.$root.error = false;

// ----------------------------------------------- $scope(function) ----------------------------------------------------//
        $scope.login = () => {
                $Users.login($scope, true);
        };

    }]);
