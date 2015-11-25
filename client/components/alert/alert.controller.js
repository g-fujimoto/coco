angular.module('webApp')
    .controller('AlertController', ['$scope', '$$Alert', function($scope, $$Alert) {
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.fujimoto = 'fujimotokun';
    }]);
