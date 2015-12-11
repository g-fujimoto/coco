var app = angular.module('webApp');

app.controller('NewItemController', ['$scope', '$$Scenes', '$$Genres', '$timeout', '$Users', '$Areas', '$$Prefs', '$stateParams', '$Items', '$state',
    function($scope, $$Scenes, $$Genres, $timeout, $Users, $Areas, $$Prefs, $stateParams, $Items, $state) {
/* ----------------------------------------- $scope(value) -------------------------------- */
        $scope.global_menu = 'newItem';
        $scope.newData     = $stateParams.confirmData || {};
        $scope.scenes      = $$Scenes;
        $scope.genres      = $$Genres;
        $scope.prefs       = $$Prefs;
        $scope.confirmData = $stateParams.newData || {};
        $scope.registData  = $stateParams.confirmData || {};
/* ----------------------------------------- $scope(function) ----------------------------- */

/* ----------------------------------------- RestfulAPI ----------------------------------- */
        //getAll API
        $scope.areas = $Areas.query();

        //saveAPI
        $scope.saveAPI = () => {
            $Items.save(
                $scope.confirmData,
                () => {
                    $state.go('newItem.complete');
                },
                () => {
                    console.log('error');
                }
            );
        };

/* ----------------------------------------- $watch --------------------------------------- */


/* ----------------------------------------- modal ---------------------------------------- */
}]);
