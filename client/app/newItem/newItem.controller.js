var app = angular.module('webApp');

app.controller('NewItemController', ['$scope', '$$Scenes', '$$Genres', '$timeout', '$Users', '$Areas', '$$Prefs', '$stateParams', '$Items', '$state', '$rootScope', '$Comments', 'Upload',
    function($scope, $$Scenes, $$Genres, $timeout, $Users, $Areas, $$Prefs, $stateParams, $Items, $state, $rootScope, $Comments, Upload) {
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
            var registData = $scope.confirmData;
            registData.registerId   = $rootScope.loginUser._id;
            registData.registerUser = $rootScope.loginUser.lastName + ' ' + $rootScope.loginUser.firstName;
            console.log(registData);
            $Items.save(
                registData,
                (data) => {
                    if ($scope.files) {
                        item_upload(scope.files, data._id);
                    }
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
                (data) => {
                    if (scope.files) {
                        comment_upload(scope.files, data._id);
                    }
                    scope.$dismiss();
                }
            );
        };

/* ----------------------------------------- $watch --------------------------------------- */


/* ----------------------------------------- modal ---------------------------------------- */

// ----------------------------------------------- LocalFunction -----------------------------------------------//

        const comment_upload = (files, comment_id) => {

            if(files && files.length) {
                for(var sortNo = 0; sortNo < files.length; sortNo++) {
                    var file = files[sortNo];
                    var data = {file, comment_id, sortNo};
                    Upload.upload({
                        url: '/api/upload/comment',
                        data
                    })
                    .success((data, status, header, config) => {
                        // TODO
                    });
                }
            }
        };

        const item_upload = (files, item_id) => {

            if(files && files.length) {
                for(var sortNo = 0; sortNo < files.length; sortNo++) {
                    var file = files[sortNo];
                    var data = {file, item_id, sortNo};
                    Upload.upload({
                        url: '/api/upload/item',
                        data
                    })
                    .success((data, status, header, config) => {
                        // TODO
                    });
                }
            }
        };
}]);
