'use strict';

var app = angular.module('webApp');

app.controller('NewItemController', ['$scope', '$$Scenes', '$$Genres', '$timeout', '$Users', '$Areas', '$$Prefs', '$stateParams', '$Items', '$state', '$rootScope', '$Comments', 'Upload', '$http', function ($scope, $$Scenes, $$Genres, $timeout, $Users, $Areas, $$Prefs, $stateParams, $Items, $state, $rootScope, $Comments, Upload, $http) {
    /* ----------------------------------------- $scope(value) -------------------------------- */
    $scope.global_menu = 'newItem';
    $scope.newData = $stateParams.confirmData || {};
    $scope.scenes = $$Scenes;
    $scope.genres = $$Genres;
    $scope.prefs = $$Prefs;
    $scope.confirmData = $stateParams.newData || {};
    $scope.confirmData.pre = $scope.confirmData.pre || [];
    $scope.newData = $stateParams.registData || {};

    /* ----------------------------------------- $scope(function) ----------------------------- */

    // データ更新
    $scope.preUpload = function (files) {

        if (files && files.length) {
            $scope.confirmData.images = true;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/upload/pre',
                    file: file
                }).success(function (data, status, header, config) {
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
    $scope.saveItemAPI = function () {
        var registData = $scope.confirmData;
        registData.registerId = $rootScope.loginUser._id;
        registData.registerUser = $rootScope.loginUser.lastName + ' ' + $rootScope.loginUser.firstName;
        $Items.save(registData, function (item) {
            var registerUser = $rootScope.loginUser;
            registerUser.itemRegisterCounter.count = registerUser.itemRegisterCounter.count + 1;
            $rootScope.loginUser = registerUser;
            $Users.update(registerUser, function () {
                $state.go('newItem.complete', {
                    registData: item
                });
            });

            $Items.fiximage(JSON.stringify(registData.pre));
        }, function () {});
    };

    // データ登録
    $scope.saveAPI = function (newData, scope) {
        newData.item = newData.item._id;
        $Comments.save(newData, function (data) {
            if (scope.files) {
                comment_upload(scope.files, data._id);
            }
            $scope.pop = {
                show: true,
                message: '「行った」コメントを登録しました。'
            };
            modPop();
            scope.$dismiss();
        });
    };

    $scope.getAddress = function (postalCode) {
        var prevCode = postalCode.substr(0, 3);
        var nextCode = postalCode.substr(4, 4);
        $http({
            method: 'get',
            url: 'https://yubinbango.github.io/yubinbango-data/data/' + prevCode + '.js'
        }).success(function (data) {
            var removeData = data.substr(7);
            var correctData = removeData.substr(0, removeData.length - 3);
            var addressObj = angular.fromJson(correctData);
            var postalCodePlus = prevCode + nextCode;

            $scope.newData.address.city = addressObj[postalCodePlus][1];
            $scope.newData.address.town = addressObj[postalCodePlus][2];
        });
    };

    $scope.$watch('newData.images', function (newValue, oldValue) {

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

    var comment_upload = function comment_upload(files, comment_id) {

        if (files && files.length) {
            for (var sortNo = 0; sortNo < files.length; sortNo++) {
                var file = files[sortNo];
                var data = { file: file, comment_id: comment_id, sortNo: sortNo };
                Upload.upload({
                    url: '/api/upload/comment',
                    data: data
                }).success(function (data, status, header, config) {
                    // TODO
                });
            }
        }
    };

    var item_upload = function item_upload(files, item_id) {

        if (files && files.length) {
            for (var sortNo = 0; sortNo < files.length; sortNo++) {
                var file = files[sortNo];
                var data = { file: file, item_id: item_id, sortNo: sortNo };
                Upload.upload({
                    url: '/api/upload/item',
                    data: data
                }).success(function (data, status, header, config) {
                    // TODO
                });
            }
        }
    };

    var modPop = function modPop() {
        $timeout(function () {
            if ($scope.pop.show) {
                $scope.pop.show = false;
            } else {
                modPop();
            }
        }, 3000);
    };
}]);