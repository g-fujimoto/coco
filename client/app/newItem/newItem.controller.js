var app = angular.module('webApp');

app.controller('NewItemController', ['$scope', '$$Scenes', '$$Genres', '$timeout', '$Users', '$Areas', '$$Prefs',
    function($scope, $$Scenes, $$Genres, $timeout, $Users, $Areas, $$Prefs) {
/* ----------------------------------------- $scope -------------------------------------- */
        $scope.global_menu = 'newItem';
        $scope.newData     = {};
        $scope.scenes      = $$Scenes;
        $scope.genres      = $$Genres;
        $scope.prefs       = $$Prefs;
        $scope.areas       = $Areas.query();
        console.log($scope.areas);

        //ログイン状態監視 -> ui-routerのページ遷移時に記載する予定です。
        //-----------------------------------------------------//
        $scope.islogin     = true;
        $scope.login = function() {
            $scope.islogin = $Users.login($scope);
        };
        $scope.login();
        //-----------------------------------------------------//



/* ----------------------------------------- $watch -------------------------------------- */


/* ----------------------------------------- modal ---------------------------------------- */
}]);
