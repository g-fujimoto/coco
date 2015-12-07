var app = angular.module('webApp');

app.controller('MainController', ['$scope', '$http', '$$Scenes', '$$Genres', '$uibModal', 'Upload', '$Users', '$Comments', '$state',
  function($scope, $http, $$Scenes, $$Genres, $uibModal, Upload, $Users, $Comments, $state) {

    $scope.global_menu = 'main';
    $scope.scenelists  = $$Scenes;
    $scope.genrelists  = $$Genres;
    $scope.islogin     = true;
    $scope.pages       = [];

    $scope.login = function() {
        // test
        $scope.email    = 'omurago@gmail.com';
        $scope.password = 'a123456789';
        $scope.islogin  = !$Users.login($scope);
    };

    $scope.upload = function(files) {
        if(files && files.length) {
            for(var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    file,
                    url: '/api/upload'
                })
                .success((data, status, header, config) => {
                    console.log(`アップデート完了：${config.file.name}`);
                });
            }
        }
    };

    $scope.getItem = function() {

        var data = {};
        if ($scope.word) data.name = $scope.word;
        if ($scope.scene) data.sceneName   = $scope.sceneName;
        if ($scope.genreName) data.genreName   = $scope.genreName;
        if ($scope.area) data.area   = $scope.area;

        $http.post('/api/items/find', JSON.stringify(data))
        .success((data) => {
            $scope.items = data;

            $scope.getComments();

            $scope.currentPage = 1;
            $scope.pages       = [];
            for(var i = Math.ceil(data.length/10) + 1;--i;) {
                $scope.pages.unshift(i);
            }
        });
    };

    $scope.getComments = function() {

        var data = {};
        data.itemId = _.pluck($scope.items, '_id');

        $http.post('/api/comments/find', JSON.stringify(data))
        .success((data) => {

            // 店舗IDリスト作成
            var item_comments = _.pluck($scope.items, '_id');

            // 店舗毎にコメントを操作
            for (var i in item_comments) {

                var comments = _.filter(data, (num) => {
                    return num.itemId === item_comments[i];
                });

                // ジャンルポイント平均作成
                var genreAvelist = _.pluck(comments, 'genreAve');
                var genreAveSum = _.reduce(genreAvelist, (memo, num) => {
                     return memo + num;
                 }, 0);
                var genreAves = genreAveSum / genreAvelist.length;

                // 行きたいコメントに絞り込み①
                comments = _.filter(data, (num) => {
                    return num.type === 1;
                });

                // シーンポイント平均作成
                var sceneAvelist = _.pluck(comments, 'sceneAve');
                var sceneAveSum = _.reduce(sceneAvelist, (memo, num) => {
                     return memo + num;
                 }, 0);
                var sceneAves = sceneAveSum / sceneAvelist.length;

                // 最新コメント情報作成
                var topick = _.max(comments, (comment) => {
                     return comment._id;
                 });

                item_comments[item_comments[i]] = {
                    topick,
                    genreAves,
                    sceneAves
                };

            }

            $scope.item_comments = item_comments;

            $scope.show_loading = false;
        });
    };

    $scope.findAddArea = function(value) {
        $scope.area = ($scope.area == value) ? null : value;
        $scope.getItem();
    };

    $scope.findAddScene = function(value) {
        $scope.sceneName = ($scope.sceneName == value) ? null : value;
        $scope.getItem();
    };

    $scope.findAddGenre = function(value) {
        $scope.genreName = ($scope.genreName == value) ? null : value;
        $scope.getItem();
    };

    // ページャー処理
    $scope.$watch('currentPage', (newValue, oldValue) => {
        if (!newValue) {
            $scope.currentPage = 1;
        } else if (newValue != 1 && newValue > $scope.pages.length) {
            $scope.currentPage = $scope.pages.length;
        } else if(oldValue){
            $scope.getComments();
        }
    });

    $scope.$watch('word', (newValue, oldValue) => {
        if (!newValue && !oldValue) return;
        $scope.getItem();
    });

    $scope.$watch('files', () => {
        $scope.upload($scope.files);
    });

    $scope.login();
    $scope.getItem();
// ----------------------------------------------- RESTful API -----------------------------------------------//

// データ登録
$scope.saveAPI = (newData) => {
    calcAve(newData);
    newData.item = newData.item._id;
    $Comments.save(
        newData,
        () => {
            $scope.comments = $Comments.query();
            $state.go('main');
        }
    );
};

// ----------------------------------------------- LocalFunction -----------------------------------------------//

                const calcAve = (newData) => {
                    //ジャンル平均点
                    const genreRate = _.map(newData.genre.options, (element) => {
                        return element.rate;
                    });
                    const genreRateSum = genreRate.reduce((x, y) => {
                        return x + y;
                    });
                    newData.genreAve = (genreRateSum / 5).toFixed(1);

                    // //シーン平均点
                    // const scenesRates = _.map($scope.newData.scenes, (element) => {
                    //
                    //     const sceneRate = _.map(element.options, (childElement) => {
                    //         return childElement.rate;
                    //     });
                    //     const sceneRateAll = sceneRate.reduce((x, y) => {
                    //             return x + y;
                    //     });
                    //     return sceneRateAll;
                    //     });
                    // const scenesRatesSum = scenesRates.reduce((x, y) => {
                    //     return x + y;
                    // });
                    // $scope.newData.scenesAve = (scenesRatesSum / $scope.newData.scenes.length).toFixed(1);
                };
}]);
