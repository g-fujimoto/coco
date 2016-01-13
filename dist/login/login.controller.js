'use strict';

angular.module('webApp').controller('LoginController', ['$scope', '$rootScope', '$Users', function ($scope, $rootScope, $Users) {
    // ----------------------------------------------- $scope(value) ----------------------------------------------------//
    // ----------------------------------------------- $scope(function) ----------------------------------------------------//
    $scope.login = function () {
        $Users.login($scope, false);
    };
}]);