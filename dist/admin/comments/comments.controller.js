'use strict';

angular.module('webApp').controller('CommentsController', ['$scope', '$Comments', '$Areas', '$$Genres', '$$Scenes', '$$Rates', '$timeout', '$state', '$$Alerts', '$stateParams', '$Users', '$Items', function ($scope, $Comments, $Areas, $$Genres, $$Scenes, $$Rates, $timeout, $state, $$Alerts, $stateParams, $Users, $Items) {
    // ----------------------------------------------- $scope ----------------------------------------------------//

    $scope.apiName = 'comments';
    $scope.isLogin = true;
    $scope.genres = $$Genres;
    $scope.scenes = $$Scenes;
    $scope.rates = $$Rates;
    $scope.alerts = [];
    $scope.users = $Users.query();
    $scope.items = $Items.query();
    $scope.types = [{ label: '行った', value: true }, { label: '行きたい', value: false }];

    //新規登録画面からのアラートメッセージを受け取る
    if ($stateParams.alert) {
        $scope.alerts.push($stateParams.alert);
        $timeout(function () {
            $scope.alerts.splice(0, 1);
        }, 1800);
    }

    $scope.selectScenes = [];
    $scope.newData = {
        disabled: true
    };
    $scope.newData.scenes = [];

    $scope.addScenes = function () {
        $scope.newData.scenes.push($scope.newData.scene);
        var selectSceneName = $scope.newData.scene.name;
        $scope.scenes = _.reject($scope.scenes, function (element) {
            return element.name === selectSceneName;
        });
        $scope.selectScenes.push(selectSceneName);
        if ($scope.selectScenes) $scope.noSelectScene = true;
        $scope.newData.disabled = true;
        $scope.newData.scene = {};
    };

    // ----------------------------------------------- $watch ----------------------------------------------------//

    //newData.disabled 監視
    $scope.$watch('newData', function (newValue) {
        if (newValue.scene) {
            if (newValue.scene.name) {
                $scope.newData.disabled = false;
            }
        } else {
            $scope.newData.disabled = true;
        }
    }, true);

    // ----------------------------------------------- RESTful API -----------------------------------------------//

    // データ全件取得
    $scope.datas = $Comments.query();

    // データ登録
    $scope.saveAPI = function () {
        calcAve();
        $scope.newData.user = $scope.newData.user._id;
        $scope.newData.item = $scope.newData.item._id;
        $Comments.save($scope.newData, function () {
            $scope.comments = $Comments.query();
            $state.go('comments', {
                alert: $$Alerts.successSave
            });
        });
    };

    // データ更新
    $scope.updateAPI = function (scope) {
        $Comments.update(scope, function () {
            $scope.datas = $Comments.query();
            $scope.alerts.push($$Alerts.successUpdate);
            $scope.datas.splice($scope.index, 1);
            $timeout(function () {
                $scope.alerts.splice(0, 1);
            }, 1800);
        });
    };

    // データ削除
    $scope.deleteAPI = function (data, scope) {
        $Comments.delete({ _id: data._id }, function () {
            $scope.datas = $Comments.query();
            $scope.alerts.push($$Alerts.successDelete);
            $scope.datas.splice($scope.index, 1);
            $timeout(function () {
                $scope.alerts.splice(0, 1);
            }, 1800);
            scope.$dismiss();
        });
    };
    // ----------------------------------------------- LocalFunction -----------------------------------------------//

    var calcAve = function calcAve() {
        //ジャンル平均点
        var genreRate = _.map($scope.newData.genre.options, function (element) {
            return element.rate;
        });
        var genreRateSum = genreRate.reduce(function (x, y) {
            return x + y;
        });
        $scope.newData.genreAve = (genreRateSum / 5).toFixed(1);

        //シーン平均点
        var scenesRates = _.map($scope.newData.scenes, function (element) {

            var sceneRate = _.map(element.options, function (childElement) {
                return childElement.rate;
            });
            var sceneRateAll = sceneRate.reduce(function (x, y) {
                return x + y;
            });
            return sceneRateAll;
        });
        var scenesRatesSum = scenesRates.reduce(function (x, y) {
            return x + y;
        });
        $scope.newData.scenesAve = (scenesRatesSum / $scope.newData.scenes.length).toFixed(1);
    };
}]);