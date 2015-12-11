var app = angular.module('webApp');

app.controller('MyPageController', ['$scope', '$http', '$$Scenes', '$$Genres', '$uibModal', '$timeout', '$Users', '$Comments', 'Upload', '$Recommend',
    function($scope, $http, $$Scenes, $$Genres, $uibModal, $timeout, $Users, $Comments, Upload, $Recommend) {
// ----------------------------------------------- $scope ----------------------------------------------------//

    $scope.global_menu = 'myPage';
    $scope.apiName     = 'users';
    $scope.scenes      = $$Scenes;
    $scope.genres      = $$Genres;
    $scope.pages       = [];
    $scope.type        = [
                            {label: '行きたい', type: false},
                            {label: '行った', type: true}
                        ];

// ----------------------------------------------- RestfulAPI ------------------------------------------------//

    $scope.comments = $Comments.query();

// ----------------------------------------------- $scope(function) --------------------------------------------//

    $scope.recommendAdd = function(item) {
        $Recommend.add(item)
        .success(function (data) {
            if (data.ok === 1) {
                $scope.pop = {
                    show : true,
                    message : '推薦店舗を追加しました。'
                }
            }
        });
    };

    $scope.recommendDelete = function(item) {

        $Recommend.delete(item)
        .success(function (data) {
            if (data.ok === 1) {
                $scope.pop = {
                    show : true,
                    message : '推薦店舗を削除しました。'
                }
                $scope.getRecommendItem();
            }
        });
    };

    $scope.modPop = function() {
        $timeout(function() {
            if ($scope.pop.show) {
              $scope.pop.show =false;
            } else {
                scope.modPop();
            }
        },3000);
    }

    $scope.saveUser = function () {
        if ($scope.files[0]) {
            Upload.upload({
                url: 'api/upload/user',
                file: $scope.files[0]
            })
            .success(function(data, status, header, config){
                console.log('OK');
            });
        }
    };

    $scope.getRecommendItem = function() {
        var data = {};
        if ($scope.scene) data.scene   = $scope.scene;

        $http.post('/api/items/recommend_item', JSON.stringify(data))
        .success((data) => {

            $scope.items = data;
            $scope.getSumAve();

            $scope.currentPage = 1;
            $scope.pages       = [];
            for(var i = Math.ceil(data.length/10) + 1;--i;) {
                $scope.pages.unshift(i);
            }
        });
    };

    $scope.getSumAve = () => {

        var items = _.pluck($scope.items, '_id');
        $Comments.went_items(items)
        .success((data) => {

            // 店舗IDリスト作成
            var item_ids = _.pluck($scope.items, '_id');
            var sum_ave = [];

            // 店舗毎にコメントを操作
            for (var i in item_ids) {

                var comments = _.filter(data, (num) => {
                    return num.item._id === item_ids[i];
                });

                // ジャンルポイント平均作成
                var genreAvelist = _.pluck(comments, 'genreAve');
                var genreAveSum = _.reduce(genreAvelist, (memo, num) => {
                     return memo + num;
                }, 0);
                var genreAve = genreAveSum < 1 ? 0 : genreAveSum / genreAvelist.length;

                // シーンポイント平均作成
                var sceneAvelist = _.pluck(comments, 'sceneAve');
                var sceneAveSum = _.reduce(sceneAvelist, (memo, num) => {
                     return memo + num;
                }, 0);
                var sceneAve = sceneAveSum < 1 ? 0 : sceneAveSum / sceneAvelist.length;

                sum_ave[item_ids[i]] = {genreAve, sceneAve };

            }

            $scope.sum_ave = sum_ave;
        });
    }

    $scope.getWentComments = () => {
        $http.post('/api/comments/went')
        .success((data) => {
            $scope.went_comments = data;
            $scope.currentPage = 1;
            $scope.pages       = [];
            for(var i = Math.ceil(data.length/10) + 1;--i;) {
                $scope.pages.unshift(i);
            }
        });
    };

    $scope.getWantGoComments = () => {
        $http.post('/api/comments/wantGo')
        .success((data) => {
            $scope.wantgo_comments = data;
            $scope.currentPage = 1;
            $scope.pages       = [];
            for(var i = Math.ceil(data.length/10) + 1;--i;) {
                $scope.pages.unshift(i);
            }
        });
    };
// ----------------------------------------------- $watch ----------------------------------------------------//

    $scope.$watch('item_comments', (newValue) => {
        if (!newValue) return;
        $scope.show_loading = false;
    });

    // ページャー処理
    $scope.$watch('currentPage', (newValue) => {
        if (!newValue) {
            $scope.currentPage = 1;
        } else if (newValue != 1 && newValue > $scope.pages.length) {
            $scope.currentPage = $scope.pages.length;
        }
    });

    // 検索
    $scope.$watch('area', function(newValue, oldValue) {
        if (!newValue) return;
        $scope.getItem();
    });

    $scope.$watch('scene', function(newValue, oldValue) {
        if (!newValue) return;
        $scope.getItem();
    });

    $scope.$watch('genre', function(newValue, oldValue) {
        if (!newValue) return;
        $scope.getItem();
    });

    // 通知
    $scope.$watch('pop', function(newValue, oldValue) {
        if (newValue) {
            $scope.modPop();
        }
    });

}]);
