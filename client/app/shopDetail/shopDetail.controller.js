var app = angular.module('webApp');

app.controller('ShopDetailController', ['$scope', '$http', '$$Scenes', '$$Genres', '$uibModal', 'Upload', '$stateParams', '$Users', '$Comments',
  function($scope, $http, $$Scenes, $$Genres, $uibModal, Upload, $stateParams, $Users, $Comments) {

// ----------------------------------------------- $scope(value) ----------------------------------------------------//
    $scope.scenes = $$Scenes;
    $scope.genres = $$Genres;
    $scope.item   = $stateParams.item;
// ----------------------------------------------- $scope(function) ----------------------------------------------------//

    //item._idで絞ったコメントを全件取得
    $scope.itemComments = (_id) => {
        $Comments.itemComments(_id);
    };

    $scope.getSumAve = () => {

        $Comments.went_items($scope.item._id)
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

                sum_ave[item_ids[i]] = {
                    genreAve,
                    sceneAve
                };
            }

            $scope.sum_ave = sum_ave;

        });
    };

    $Comments.itemComments($stateParams.item._id)
        .success((data) => {
            $scope.itemComments = data;
        });
    $scope.getSumAve();


    $scope.wantGoFilter = () => {
        $scope.goFlg = false;
    };

    $scope.wentFilter = () => {
        $scope.goFlg = true;
    };



// ----------------------------------------------- $watch ----------------------------------------------------//

}]);
