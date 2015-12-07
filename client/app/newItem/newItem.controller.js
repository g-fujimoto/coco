var app = angular.module('webApp');

app.controller('NewItemController', ['$scope', '$$Scenes', '$$Genres', '$timeout', '$Users', '$Areas', '$$Prefs', '$stateParams', '$Items', '$state',
    function($scope, $$Scenes, $$Genres, $timeout, $Users, $Areas, $$Prefs, $stateParams, $Items, $state) {
/* ----------------------------------------- $scope(value) -------------------------------- */
        $scope.global_menu = 'newItem';
        $scope.newData     = $stateParams.confirmData || {};
        $scope.scenes      = $$Scenes;
        $scope.genres      = $$Genres;
        $scope.prefs       = $$Prefs;
        $scope.areas       = $Areas.query();
        $scope.confirmData = $stateParams.newData || {};
        /* ----------------------------------------- $scope(function) ------------------------ */
        //ログイン状態監視 -> ui-routerのページ遷移時に記載する予定です。
        //-----------------------------------------------------//
        $scope.islogin     = true;
        $scope.login = function() {
            $scope.islogin = $Users.login($scope);
        };
        $scope.login();
        //-----------------------------------------------------//
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
