var app = angular.module('webApp');

app.controller('SearchController', ['$scope', '$http', '$uibModal', '$timeout', '$Users', '$Recommend',
    function($scope, $http, $uibModal, $timeout, $Users, $Recommend) {

// ----------------------------------------------- $scope ----------------------------------------------------//

    $scope.global_menu = 'search';
    $scope.pages      = [];

    $scope.recommendAdd = function(item) {
        $Recommend.add(item._id)
        .success(function (data) {
            if (data.ok === 1) {
                item.itemRecommendCounter.count += 1;
                $scope.pop = {
                    show : true,
                    message : '推薦店舗を追加しました。'
                }
            }
        });
    };

    $scope.findAddScene = function(value) {
        $scope.sceneName = ($scope.sceneName == value) ? null : value;
        getItem();
    };

// ----------------------------------------------- $watch ----------------------------------------------------//

    // ページャー処理
    $scope.$watch('currentPage', function(newValue, oldValue) {
        if (!newValue) {
            $scope.currentPage = 1;
        } else if (newValue != 1 && newValue > $scope.pages.length) {
            $scope.currentPage = $scope.pages.length;
        } else if(oldValue){
            getComments();
        }
    });

    $scope.$watch('word', function(newValue, oldValue) {
        if (!newValue && !oldValue) return;
        getItem();
    });

    $scope.$watch('pop', function(newValue, oldValue) {
        if (newValue) {
            modPop();
        }
    });

// ----------------------------------------------- LocalFunction -----------------------------------------------//

    const modPop = () =>  {
        $timeout(function() {
            if ($scope.pop.show) {
              $scope.pop.show =false;
            } else {
                modPop();
            }
        },3000);
    }

    const getItem = () =>  {

        var data = {};
        if ($scope.word) data.name = $scope.word;
        if ($scope.sceneName) data.sceneNames   = $scope.sceneName;

        $http.post('/api/items/find', JSON.stringify(data))
        .success((data) => {
            $scope.items = data;
            getComments();

            $scope.currentPage = 1;
            $scope.pages       = [];
            for(var i = Math.ceil(data.length/10) + 1;--i;) {
                $scope.pages.unshift(i);
            }
        });
    };

    const getComments = () =>  {

        var data = {};
        data.item = _.pluck($scope.items, '_id');

        $http.post('/api/comments/find', JSON.stringify(data))
        .success((data) => {

            // 店舗IDリスト作成
            var item_ids = _.pluck($scope.items, '_id');

            var item_comments = [];

            // 店舗毎にコメントを操作
            for (var i in item_ids) {

                var comments = _.filter(data, (num) => {
                    return num.item._id === item_ids[i];
                });

                // 最新コメント情報作成
                var comment = comments[0];

                // 行きたいコメントに絞り込み①
                comments = _.filter(comments, (num) => {
                    return num.type === true;
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

                item_comments[item_ids[i]] = {comment, genreAve, sceneAve };

            }

            $scope.item_comments = item_comments;

            $scope.show_loading = false;
        });
    };

// ----------------------------------------------- Immediately Function -----------------------------------------------//

    getItem();

}]);
