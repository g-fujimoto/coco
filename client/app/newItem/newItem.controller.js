var app = angular.module('webApp');

app.controller('NewItemController', ['$scope', '$$Scenes', '$$Genres', '$timeout', '$Users', '$Areas', '$$Prefs', '$stateParams', '$Items', '$state', '$rootScope', '$Comments',
    function($scope, $$Scenes, $$Genres, $timeout, $Users, $Areas, $$Prefs, $stateParams, $Items, $state, $rootScope, $Comments) {
/* ----------------------------------------- $scope(value) -------------------------------- */
        $scope.global_menu = 'newItem';
        $scope.newData     = $stateParams.confirmData || {};
        $scope.scenes      = $$Scenes;
        $scope.genres      = $$Genres;
        $scope.prefs       = $$Prefs;
        $scope.confirmData = $stateParams.newData || {};
        $scope.newData  = $stateParams.registData || {};

/* ----------------------------------------- $scope(function) ----------------------------- */

/* ----------------------------------------- RestfulAPI ----------------------------------- */
        //getAll API
        $scope.areas = $Areas.query();

        //saveAPI
        $scope.saveItemAPI = () => {
            $Items.save(
                $scope.confirmData,
                (data) => {
                    $state.go('newItem.complete', {
                        registData : data
                    });
                },
                () => {
                    console.log('error');
                }
            );
        };

        // データ登録
        $scope.saveAPI = (newData, scope) => {
            newData.item = newData.item._id;
            $Comments.save(
                newData,
                () => {
                    scope.$dismiss();
                }
            );
        };

/* ----------------------------------------- $watch --------------------------------------- */


/* ----------------------------------------- modal ---------------------------------------- */
}]);
