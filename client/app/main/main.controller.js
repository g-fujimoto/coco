var app = angular.module('webApp');

app.controller('MainController', ['$scope', '$http', '$$Scenes', '$$Genres', '$uibModal', '$timeout', function($scope, $http, $$Scenes, $$Genres, $uibModal, $timeout) {

    $scope.global_menu = 'main';
    $scope.pages      = [];

    $scope.getItem = function() {

        var data = {};
        if ($scope.word) data.itemName = $scope.word;
        if ($scope.scene) data.scene   = $scope.scene;
        if ($scope.genreName) data.genreName   = $scope.genreName;
        if ($scope.area) data.area   = $scope.area;

console.log(data.scene);
console.log(data.genreName);
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

        data = {};
        for (var i in $scope.items) {
            angular.merge(data, {_id : $scope.items[i]._id});
        }

        $http.get('/api/itemComments', JSON.stringify(data))
        .success(function(data) {

            $scope.item_comments = data;

            $scope.item_comments = [];
            $scope.item_comments[13] = {comment : 'ふつう', name : 'ふじもとたろう'};
            $scope.item_comments[13] = {comment : 'おいしい', name : 'ふじもとはなこ'};

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
        } else {
            $scope.getComments();
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
    $scope.showModal = function() {
        $scope.modalOption = {
            title    : 'やまっち',
            titleEng : 'yamacchi',
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

}]);
