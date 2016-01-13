'use strict';

angular.module('webApp').controller('AlertController', ['$scope', function ($scope) {
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
}]);