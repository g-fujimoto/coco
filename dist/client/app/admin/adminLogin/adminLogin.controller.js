'use strict';

angular.module('webApp').controller('AdminLoginController', ['$scope', '$rootScope', '$Users', function ($scope, $rootScope, $Users) {
    // ----------------------------------------------- $scope(value) ----------------------------------------------------//
    // ----------------------------------------------- $scope(function) ----------------------------------------------------//
    $scope.login = function () {
        $Users.login($scope, true);
    };
}]);