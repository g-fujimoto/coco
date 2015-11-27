angular.module('webApp')
    .controller('CommentsController', ['$scope', '$uibModal', '$CommentsService', '$AreaService', '$$Genres', '$$Scenes',
            function($scope, $uibModal,  $CommentsService, $AreaService, $$Genres, $$Scenes) {
                //$scope宣言
                    $scope.alerts  = [];
                    $scope.apiName = 'comments';
                    $scope.genres  = $$Genres;
                    $scope.scenes  = $$Scenes;

                    //Comments データ登録
                    $scope.registerItem = function() {
                        $CommentsService.save($scope, $scope.newComment);
                    };

                //データ取得
                    $CommentsService.findAll($scope);
                    $AreaService.findAll($scope);

// ----------------------------------------------- モーダル呼び出し -----------------------------------------------//
                //編集モーダル呼び出し
                $scope.showEditModal = function($index) {
                    $scope.index      = $index;
                    $scope.selectComment = $scope.comments[$index];
                    $scope.editComment = _.cloneDeep($scope.selectComment);

                    $uibModal.open({
                        templateUrl : './components/modal/comments/modal.edit.html',
                        scope       : $scope,
                        controller  : 'ModalController',
                        backdrop    : 'static'
                    });
                };

                //削除モーダル呼び出し
                $scope.showDeleteModal = function($index) {
                    $scope._id   = $scope.comments[$index]._id;
                    $scope.index = $index;
                    $uibModal.open({
                        controller  : 'ModalController',
                        backdrop    : 'static',
                        scope       : $scope,
                        templateUrl : './components/modal/modal.delete.html'
                    });
                };
    }]);
