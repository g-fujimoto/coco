var app = angular.module('webApp');

app.controller('ShopDetailController', ['$scope', '$http', '$$Scenes', '$$Genres', '$uibModal', 'Upload', '$stateParams', '$Users',
  function($scope, $http, $$Scenes, $$Genres, $uibModal, Upload, $stateParams, $Users) {
// ----------------------------------------------- $scope(value) ----------------------------------------------------//
    $scope.scenes      = $$Scenes;
    $scope.genres      = $$Genres;
    $scope.item        = $stateParams.item;
    console.log($scope.item);

// ----------------------------------------------- $scope(function) ----------------------------------------------------//

// ----------------------------------------------- $watch ----------------------------------------------------//

}]);
