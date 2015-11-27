var app = angular.module('webApp');

app.controller('MainController', ['$scope', '$http', '$$Scenes', '$$Genres', '$uibModal', '$timeout', function($scope, $http, $$Scenes, $$Genres, $uibModal, $timeout) {

    $scope.global_menu = 'main';
    $scope.pages      = [];

    $scope.getItem = function() {

        var data = {};
        if ($scope.word) data.name = $scope.word;
        if ($scope.scene) data.scene   = $scope.scene;
        if ($scope.genreName) data.genreName   = $scope.genreName;
        if ($scope.area) data.area   = $scope.area;

        $http.post('/api/items/find', JSON.stringify(data))
        .success(function(data) {
            $scope.items = data;

            $scope.getComments();

            $scope.currentPage = 1;
            $scope.pages       = [];
            for(var i = Math.ceil(data.length/10) + 1;--i;) {
                $scope.pages.unshift(i);
            }
        });
    };

    $scope.getArea= function() {

        $http.get('/api/area')
        .success(function(data) {
            $scope.arealists = data;
        });
    };

    $scope.getComments = function() {

        var item_ids = _.pluck($scope.items, '_id');

        $http.get('/api/comments', JSON.stringify(item_ids))
        .success(function(data) {

            // 店舗IDリスト作成
            var item_comments = _.pluck($scope.items, '_id');

            // 店舗毎にコメントを操作
            for (var i in item_comments) {

                var comments = _.filter(data, function(num) {return num._item_id === item_comments[i];});

                // ジャンルポイント平均作成
                var genreAvelist = _.pluck(comments, 'genreAve');
                var genreAveSum = _.reduce(genreAvelist, function(memo, num){ return memo + num;}, 0);
                var genreAves = genreAveSum / genreAvelist.length;

                // シーンポイント平均作成
                var sceneAvelist = _.pluck(comments, 'sceneAve');
                var sceneAveSum = _.reduce(sceneAvelist, function(memo, num){ return memo + num;}, 0);
                var sceneAves = sceneAveSum / sceneAvelist.length;

                // 最新コメント情報作成
                var topick = _.max(comments, function(comment){ return comment._id});

                item_comments[item_comments[i]] = {topick : topick, genreAves : genreAves, sceneAves : sceneAves};

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
        $scope.scene = ($scope.scene == value) ? null : value;
        $scope.getItem();
    };

    $scope.findAddGenreName = function(value) {
        $scope.genreName = ($scope.genreName == value) ? null : value;
        $scope.getItem();
    };

    // ページャー処理
    $scope.$watch('currentPage', function(newValue, oldValue) {
        if (!newValue) {
            $scope.currentPage = 1;
        } else if (newValue != 1 && newValue > $scope.pages.length) {
            $scope.currentPage = $scope.pages.length;
        } else if(oldValue){
            scope.getComments();
        }
    });

    $scope.$watch('word', function(newValue, oldValue) {
        if (!newValue && !oldValue) return;
        $scope.getItem();
    });

    $scope.scenelists = $$Scenes;
    $scope.genrelists = $$Genres;

    $scope.getArea();
    $scope.getItem();

// ------------------------------- Modal ------------------------------ //
    $scope.showWentModal = function(item) {

        $scope.scenelists = $$Scenes;
        $scope.genrelists = $$Genres;

        var genre = _.select($$Genres, function(num) {
            return num.name == item.genreName
        });

        $scope.modalOption = {
            item    : item,
            genre : genre[0],
            scenelists : $$Scenes,
            modalUrl : './components/modal/modal.wantGo.html',
            scope    : $scope
        };

        $uibModal.open({
            controller  : 'ModalController',
            backdrop    : 'static',
            scope       : $scope,
            templateUrl : './components/modal/modal.went.html'
        });
    };

    $scope.showWannaModal = function(item) {

        $scope.modalOption = {
            item    : item,
            modalUrl : './components/modal/modal.wantGo.html',
            scope    : $scope
        };

        $uibModal.open({
            controller  : 'ModalController',
            backdrop    : 'static',
            scope       : $scope,
            templateUrl : './components/modal/modal.wanna.html'
        });
    };
}]);
