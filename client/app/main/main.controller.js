var app = angular.module('webApp');

app.controller('MainController', ['$scope', '$http', function($scope, $http) {

    $scope.mainPage = true;

    $http.get('/api/items')
        .success(function(data) {
          $scope.items = data;
        });

}]);
