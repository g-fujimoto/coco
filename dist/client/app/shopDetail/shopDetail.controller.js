'use strict';

var app = angular.module('webApp');

app.controller('ShopDetailController', ['$scope', '$http', '$$Scenes', '$$Genres', '$uibModal', 'Upload', '$stateParams', '$Users', '$Comments', '$timeout', '$state', '$Items', '$anchorScroll', '$window', function ($scope, $http, $$Scenes, $$Genres, $uibModal, Upload, $stateParams, $Users, $Comments, $timeout, $state, $Items, $anchorScroll, $window) {

    // ----------------------------------------------- $scope(value) ----------------------------------------------------//
    $scope.scenes = $$Scenes;
    $scope.genres = $$Genres;
    $scope.item = $stateParams.item;
    $scope.moreMain = true;
    $scope.moreMainFlg = false;
    $scope.len = 10;
    $scope.start = 0;
    $scope.current = 1;
    // ----------------------------------------------- $scope(function) ----------------------------------------------------//
    $scope.moreMainRead = function () {
        $scope.moreMain = false;
        $scope.moreMainFlg = true;
    };

    $scope.closeMainRead = function () {
        $scope.moreMain = true;
        $scope.moreMainFlg = false;
    };

    $scope.moreRead = function ($index) {
        $scope.itemComments[$index].more = true;
        $scope.itemComments[$index].moreFlg = true;
    };

    $scope.closeRead = function ($index) {
        $scope.itemComments[$index].more = false;
        $scope.itemComments[$index].moreFlg = false;
    };

    $scope.pager = function () {
        $scope.start = $scope.len * ($scope.current - 1);
        $anchorScroll();
    };

    //item._idで絞ったコメントを全件取得
    $scope.itemComments = function (_id) {
        $Comments.itemComments(_id);
    };

    $scope.getSumAve = function () {

        $Comments.went_items($scope.item._id).success(function (data) {
            //店舗 : ジャンル平均点
            var genreArr = _.pluck(data, 'genreAve');
            var sumGenre = _.reduce(genreArr, function (sum, num) {
                return sum + num;
            });
            $scope.allGenreAve = sumGenre / data.length;
            //店舗 : シーン平均点
            var sceneArr = _.pluck(data, 'sceneAve');
            var sumScene = _.reduce(sceneArr, function (sum, num) {
                return sum + num;
            });
            $scope.allSceneAve = sumScene / data.length;
        });
    };

    $scope.getSumAve();

    $Comments.itemComments($stateParams.item._id).success(function (data) {
        $scope.itemComments = data;
    });

    $scope.wentFilter = function () {
        if ($scope.goFlg === true) {
            $scope.goFlg = undefined;
        } else {
            $scope.goFlg = true;
        }
    };

    $scope.wantGoFilter = function () {
        if ($scope.goFlg === false) {
            $scope.goFlg = undefined;
        } else {
            $scope.goFlg = false;
        }
    };

    $scope.like = function (itemComment) {
        $Comments.like(itemComment).success(function (data) {
            if (data.nModified === 0) {
                $scope.pop = {
                    show: true,
                    message: '「いいね」に失敗しました。'
                };
                modPop();
            } else {
                $scope.pop = {
                    show: true,
                    message: '「いいね」しました。'
                };
                itemComment.checkRecommend = true;
                modPop();
            }
        });
    };

    // ---------------------------------------------- もっと見る機能 -------------------------------------------------//

    // ---------------------------------------------- GoogleMaps -------------------------------------------------//

    $scope.map = {
        center: {
            latitude: 0,
            longitude: 0
        },
        zoom: 17,
        options: {
            mapTypeId: google.maps.MapTypeId.SATELLITE
        },
        markers: [{
            id: 1,
            latitude: 0,
            longitude: 0,
            title: $scope.item.name,
            content: $scope.item.address.pref + $scope.item.address.city + $scope.item.address.town + $scope.item.address.building,
            show: true
        }]
    };

    $scope.codeAddress = function () {
        var geocoder = new google.maps.Geocoder();
        var address = {
            pref: $scope.item.address.pref,
            city: $scope.item.address.city,
            town: $scope.item.address.town,
            building: $scope.item.address.building
        };
        geocoder.geocode({
            address: address.pref + address.city + address.town + address.building,
            'region': 'jp'
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $timeout(function () {
                    $scope.map.center.latitude = results[0].geometry.viewport.O.O;
                    $scope.map.center.longitude = results[0].geometry.viewport.j.j;
                    $scope.map.markers[0].latitude = results[0].geometry.viewport.O.O;
                    $scope.map.markers[0].longitude = results[0].geometry.viewport.j.j;
                });
            } else {
                alert('地図の読み込みに失敗しました。');
            }
        });
        return;
    };

    // angular.forEach('$scope.map.markers', function (marker) {
    //     marker.clickMark = function () {
    //         marker.show = !marker.show;
    //     };
    // });

    // ----------------------------------------------- $watch ----------------------------------------------------//

    $scope.$watch('item', function (newValue) {
        if (!newValue) {
            $state.go('main');
        }
        $scope.codeAddress();
    });

    // ----------------------------------------------- RESTful ---------------------------------------------------//

    // データ登録
    $scope.saveAPI = function (newData, scope) {
        newData.item = newData.item._id;
        if (newData.type) calcAve(newData);
        $Comments.save(newData, function (data) {
            if (data.type === true) {
                $scope.pop = {
                    show: true,
                    message: '「行った」コメントを登録しました。'
                };
            } else {
                $scope.pop = {
                    show: true,
                    message: '「行きたい」コメントを登録しました。'
                };
            }

            if (scope.files) {
                upload(scope.files, data._id);
            }

            modPop();
            scope.$dismiss();
        });
    };

    // データ更新
    $scope.updateAPI = function (editData, scope) {
        if (scope.onefile[0]) {
            var file = scope.onefile[0];
            var item_id = scope.item._id;
            var data = { file: file, item_id: item_id };
            Upload.upload({
                url: '/api/upload/item',
                data: data
            }).success(function (data, status, header, config) {
                $scope.pop = {
                    show: true,
                    message: '画像を登録しました。'
                };
                modPop();
                $scope.item.images.push(data);
                $stateParams.item = $scope.item;
                scope.$dismiss();
            });
        }
    };

    // ----------------------------------------------- OtherFunction ---------------------------------------------------//

    var calcAve = function calcAve(newData) {
        //ジャンル平均点
        var genreRate = _.map(newData.genre.options, function (element) {
            return element.rate;
        });
        var genreRateSum = genreRate.reduce(function (x, y) {
            return parseInt(x) + parseInt(y);
        });
        newData.genreAve = (genreRateSum / 5).toFixed(1);

        //シーン平均点
        var sceneRate = _.map(newData.scene.options, function (element) {
            return element.rate;
        });
        var sceneRateSum = sceneRate.reduce(function (x, y) {
            return parseInt(x) + parseInt(y);
        });
        newData.sceneAve = (sceneRateSum / 5).toFixed(1);
    };

    var upload = function upload(files, comment_id) {

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
