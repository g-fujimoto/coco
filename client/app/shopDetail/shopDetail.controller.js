var app = angular.module('webApp');

app.controller('ShopDetailController', ['$scope', '$http', '$$Scenes', '$$Genres', '$uibModal', 'Upload', '$stateParams',
  function($scope, $http, $$Scenes, $$Genres, $uibModal, Upload, $stateParams) {

    $scope.global_menu = 'shopDetail';

    $scope.upload = function(files) {
        if(files && files.length) {
            for(var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/upload',
                    file: file
                })
                .success(function(data, status, header, config) {
                    console.log('アップデート完了：' + config.file.name);
                });
            }
        }
    };

    $scope.getItem = function() {

        $http.get('/api/items/findOne/' + $stateParams.itemid)
        .success(function(data) {
            $scope.items = data;
        });
    };

    $scope.getComments = function() {

        var data = {};
        data.itemId = $stateParams.itemid;

        $http.post('/api/comments/find', JSON.stringify(data))
        .success(function(data) {
/*
            // ジャンルポイント平均作成
            var genreAvelist = _.pluck(data, 'genreAve');
            var genreAveSum = _.reduce(genreAvelist, function(memo, num){ return memo + num;}, 0);
            $scope.items.genreAves = genreAveSum / genreAvelist.length;

            // シーンポイント平均作成
            var sceneAvelist = _.pluck(data, 'sceneAve');
            var sceneAveSum = _.reduce(sceneAvelist, function(memo, num){ return memo + num;}, 0);
            $scope.items.sceneAves = sceneAveSum / sceneAvelist.length;
*/
        });
    };

    $scope.$watch('files', function() {
        $scope.upload($scope.files);
    });

    $scope.scenelists = $$Scenes;
    $scope.genrelists = $$Genres;

    $scope.getItem();
    $scope.getComments();

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
