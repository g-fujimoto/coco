var app = angular.module('webApp');

app.controller('MainController', ['$scope', '$http', function($scope, $http) {

    $scope.mainPage = true;

    $http.get('/api/items')
        .success(function(data) {
          $scope.items = data;
          $scope.show_loading = true;
          $scope.getComments();
        });

    $scope.getComments = function() {
        $http.get('/api/itemComments')
            .success(function(data) {
              $scope.item_comments = data;
              $scope.item_comments[1] = 'test';
              $scope.show_loading = false;
            });
    };

/*
    // 以下のコードでもOK
    $scope.$watch('show_loading', function(newValue, oldValue) {
        // $scope.name が変更された際に，以下の処理が実行されます
    });
*/
}]);
