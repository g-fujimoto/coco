'use strict';

var app = angular.module('webApp');

app.controller('MyPageController', ['$scope', '$http', '$uibModal', '$timeout', '$Users', '$Comments', 'Upload', '$Recommend', '$state', '$$Scenes', '$anchorScroll', function ($scope, $http, $uibModal, $timeout, $Users, $Comments, Upload, $Recommend, $state, $$Scenes, $anchorScroll) {
    // ----------------------------------------------- $scope ----------------------------------------------------//

    $scope.scenes = $$Scenes;
    $scope.global_menu = 'myPage';
    $scope.apiName = 'users';
    $scope.len = 10;
    $scope.start = 0;
    $scope.current = 1;
    $scope.type = [{ label: '行きたい', type: false }, { label: '行った', type: true }];

    // ----------------------------------------------- $scope(function) --------------------------------------------//

    /**
     * もっと読む関連処理
     * @author [t.fujimoto]
     */
    $scope.moreRead = function ($index) {
        $scope.went_comments[$index].more = true;
        $scope.went_comments[$index].moreFlg = true;
    };

    $scope.closeRead = function ($index) {
        $scope.went_comments[$index].more = false;
        $scope.went_comments[$index].moreFlg = false;
    };

    /**
     * ページング処理
     * @author [t.fujimoto]
     */
    $scope.pager = function () {
        $scope.start = $scope.len * ($scope.current - 1);
        $anchorScroll();
    };

    $scope.wentRecommendAdd = function (comment) {
        $Recommend.add(comment.item._id).success(function (data) {
            if (data.message === 'over') {
                $scope.pop = {
                    show: true,
                    message: '推薦店舗が10件に達しています。'
                };
            } else {
                if (data.ok === 1) {
                    $scope.pop = {
                        show: true,
                        message: '推薦店舗を追加しました。'
                    };
                    comment.checkRecommend = true;
                }
            }
        });
    };

    $scope.recommendDelete = function (item) {

        $Recommend.delete(item).success(function (data) {
            if (data.ok === 1) {
                $scope.pop = {
                    show: true,
                    message: '推薦店舗を削除しました。'
                };
                $scope.getRecommendItem();
            }
            $scope.item.alreadyAdd = false;
        });
    };

    $scope.getRecommendItem = function () {

        var data = {};
        if ($scope.scene) data.scene = $scope.scene;

        $http.post('/api/items/recommend_item', JSON.stringify(data)).success(function (data) {

            $scope.items = data;
            getSumAve();
            $scope.currentPage = 1;
            $scope.pages = [];
            for (var i = Math.ceil(data.length / 10) + 1; --i;) {
                $scope.pages.unshift(i);
            }
        });
    };

    $scope.getWentComments = function () {
        $http.post('/api/comments/went').success(function (data) {
            $scope.went_comments = data;
            $scope.currentPage = 1;
            $scope.pages = [];
            for (var i = Math.ceil(data.length / 10) + 1; --i;) {
                $scope.pages.unshift(i);
            }
        });
    };

    $scope.getWantGoComments = function () {
        $http.post('/api/comments/wantGo').success(function (data) {
            $scope.wantgo_comments = data;
            $scope.currentPage = 1;
            $scope.pages = [];
            for (var i = Math.ceil(data.length / 10) + 1; --i;) {
                $scope.pages.unshift(i);
            }
        });
    };

    $scope.findAddArea = function (value) {
        $scope.area = $scope.area == value ? undefined : value;
    };

    $scope.findAddScene = function (value) {
        $scope.sceneName = $scope.sceneName == value ? undefined : value;
    };

    $scope.findAddGenre = function (value) {
        $scope.genreName = $scope.genreName == value ? undefined : value;
    };

    // ----------------------------------------------- $watch ----------------------------------------------------//

    $scope.$watch('item_comments', function (newValue) {
        if (!newValue) return;
        $scope.show_loading = false;
    });

    // 通知
    $scope.$watch('pop', function (newValue) {
        if (newValue) {
            modPop();
        }
    });

    // ----------------------------------------------- RESTfulAPI ------------------------------------------------//

    //Read
    $scope.comments = $Comments.query();

    //Update
    $scope.updateAPI = function (editData, scope) {
        if (editData.updateFlg) {
            $Comments.update(editData, function (data) {
                if (editData.type === true) {
                    $scope.pop = {
                        show: true,
                        message: '「行った」コメントを更新しました。'
                    };
                } else {
                    $scope.pop = {
                        show: true,
                        message: '「行きたい」コメントを更新しました。'
                    };
                }
                $timeout(function () {
                    scope.comment.body = data.body;
                    modPop();
                    scope.$dismiss();
                });
            });
        } else if (editData.passwordFlg) {
            $http({
                method: 'POST',
                url: '/api/users/check',
                data: editData
            }).success(function () {
                $scope.pop = {
                    show: true,
                    message: 'パスワードを更新しました。'
                };
                modPop();
                scope.$dismiss();
            });
        } else {
            editData.updateFlg = true;
            if (scope.onefile[0]) {
                Upload.upload({
                    url: 'api/upload/user',
                    file: scope.onefile[0]
                }).success(function () {
                    console.log('OK');
                });
            }
            $Users.update(editData, function (data) {
                $scope.pop = {
                    show: true,
                    message: 'プロフィールを更新しました。'
                };
                $scope.$root.loginUser = data;
                modPop();
                scope.$dismiss();
            });
        }
    };

    // ----------------------------------------------- LocalFunciton ------------------------------------------------//

    var getSumAve = function getSumAve() {

        var items = _.pluck($scope.items, '_id');
        $Comments.went_items(items).success(function (data) {

            // 店舗IDリスト作成
            var item_ids = _.pluck($scope.items, '_id');
            var sum_ave = [];

            // 店舗毎にコメントを操作
            for (var i in item_ids) {

                var comments = _.filter(data, function (num) {
                    return num.item._id === item_ids[i];
                });

                // ジャンルポイント平均作成
                var genreAvelist = _.pluck(comments, 'genreAve');
                var genreAveSum = _.reduce(genreAvelist, function (memo, num) {
                    return memo + num;
                }, 0);
                var genreAve = genreAveSum < 1 ? 0 : genreAveSum / genreAvelist.length;

                // シーンポイント平均作成
                var sceneAvelist = _.pluck(comments, 'sceneAve');
                var sceneAveSum = _.reduce(sceneAvelist, function (memo, num) {
                    return memo + num;
                }, 0);
                var sceneAve = sceneAveSum < 1 ? 0 : sceneAveSum / sceneAvelist.length;

                sum_ave[item_ids[i]] = { genreAve: genreAve, sceneAve: sceneAve };
            }

            $scope.sum_ave = sum_ave;
        });
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