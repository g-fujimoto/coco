var app = angular.module('webApp');

app.controller('MainController', ['$scope', '$http', function($scope, $http) {

    $scope.mainPage = true;
    $scope.pages = [];

    $scope.getItem = function() {
        $http.get('/api/items')
        .success(function(data) {
            $scope.items = data;
        });
    }

    $scope.getComments = function() {
        $http.get('/api/itemComments')
        .success(function(data) {
            $scope.item_comments = data;
        });
    };

    $scope.$watch('items', function(newValue, oldValue) {
        if (!newValue) return;
        $scope.pages = [];
        for(var i = Math.ceil(newValue.length/10) + 1;--i;) {
            $scope.pages.unshift(i);
        }
        $scope.getComments();
    });

    $scope.$watch('item_comments', function(newValue, oldValue) {
        if (!newValue) return;
        $scope.show_loading = false;
    });

    $scope.$watch('currentPage', function(newValue, oldValue) {
        if (!newValue) {
            $scope.currentPage = 1;
        } else if (newValue != 1 && newValue > $scope.pages.length) {
            $scope.currentPage = $scope.pages.length;
        } else {
            $scope.getComments();
        }
    });

    $scope.$watch('findArea', function(newValue, oldValue) {
        if (!newValue) return;
        $scope.getItem();
    });

    $scope.getItem();

}]);
