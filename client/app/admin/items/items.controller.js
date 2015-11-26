angular.module('webApp')
    .controller('ItemsController', ['$scope', '$uibModal', '$ItemsService',
            function($scope, $uibModal,  $ItemsService, $$Genres) {

                //$scope宣言
                $scope.alerts = [];
                $scope.genres = $$Genres;

                //Items全件出力
                $ItemsService.findAll($scope);

                //Itemsデータ登録
                $scope.registerItem = function() {
                    $ItemsService.save($scope, $scope.newItem);
                };

// ----------------------------------------------- モーダル呼び出し -----------------------------------------------//

                //編集モーダル呼び出し
                $scope.showEditModal = function($index) {
                    $scope.index     = $index;
                    $scope.selectRow = $scope.items[$index];

                    $uibModal.open({
                        templateUrl : './components/modal/modal.edit.html',
                        scope       : $scope,
                        controller  : 'ModalController',
                        backdrop    : 'static'
                    });
                };

                //削除モーダル呼び出し
                $scope.showDeleteModal = function($index) {
                    $scope._id   = $scope.items[$index]._id;
                    $scope.index = $index;

                    $uibModal.open({
                        controller  : 'ModalController',
                        backdrop    : 'static',
                        scope       : $scope,
                        templateUrl : './components/modal/modal.delete.html'
                    });
                };
    }]);
