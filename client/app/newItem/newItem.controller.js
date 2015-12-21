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
        $scope.confirmData.pre = $scope.confirmData.pre || [];
        $scope.newData  = $stateParams.registData || {};

/* ----------------------------------------- $scope(function) ----------------------------- */

        // データ更新
        $scope.preUpload = (files) => {

            if(files && files.length) {
                $scope.confirmData.images = true;
                for(var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: '/api/upload/pre',
                        file
                    })
                    .success((data, status, header, config) => {
                        $scope.confirmData.pre.push(data);
                    });
                }
            } else {
                $scope.confirmData.images = false;
            }
        };

/* ----------------------------------------- RestfulAPI ----------------------------------- */
        //getAll API
        $scope.areas = $Areas.query();

        //saveAPI
        $scope.saveItemAPI = () => {
            var registData = $scope.confirmData;
            registData.registerId   = $rootScope.loginUser._id;
            registData.registerUser = `${$rootScope.loginUser.lastName} ${$rootScope.loginUser.firstName}`;
            $Items.save(
                registData,
                (item) => {
                    const registerUser = $rootScope.loginUser;
                    registerUser.itemRegisterCounter.count = registerUser.itemRegisterCounter.count + 1;
                    $rootScope.loginUser = registerUser;
                    $Users.update(
                        registerUser,
                        () => {
                            $state.go('newItem.complete', {
                                registData : item
                            });
                        }
                    );

                    $Items.fiximage(JSON.stringify(registData.pre));
                },
                () => {
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
                    $scope.pop = {
                        show : true,
                        message : '「行った」コメントを登録しました。'
                    };
                    modPop();
                    scope.$dismiss();
                }
            );
        };

/* ----------------------------------------- $watch --------------------------------------- */

        $scope.$watch('newData.images', (newValue, oldValue) => {

            if (oldValue) {
                for (var i in oldValue) {
                  $scope.newData.images.push(oldValue[i]);
                }
            }

            if ($scope.newData.images && $scope.newData.images.length > 3) {
                $scope.newData.images.splice(0, $scope.newData.images.length - 3);
            }
        });


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

        const modPop = () =>  {
            $timeout(() => {
                if ($scope.pop.show) {
                  $scope.pop.show =false;
                } else {
                    modPop();
                }
            },3000);
        };
}]);
