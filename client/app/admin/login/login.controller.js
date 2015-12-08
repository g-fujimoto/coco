angular.module('webApp')
    .controller('LoginController', ['$scope', '$Users', function($scope, $Users) {
        $scope.error = false;
        $scope.login = () => {
            $Users.login($scope);
        };
    }]);
