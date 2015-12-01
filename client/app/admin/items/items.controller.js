angular.module('webApp')
    .controller('ItemsController', ['$scope', '$uibModal', '$ItemsService', '$Areas', '$$Genres', '$$Prefs',
            function($scope, $uibModal,  $ItemsService, $Areas, $$Genres, $$Prefs) {
                //$scope宣言
                    $scope.alerts  = [];
                    $scope.areas   = $Areas.query();
                    $scope.apiName = 'items';
                    $scope.genres  = $$Genres;
                    $scope.prefs   = $$Prefs;

                    //Itemsデータ登録
                    $scope.registerItem = function() {
                        $ItemsService.save($scope, $scope.newItem);
                    };

                //データ取得
                    $ItemsService.findAll($scope);


// ----------------------------------------------- モーダル呼び出し -----------------------------------------------//
                //編集モーダル呼び出し
                $scope.showEditModal = function($index) {
                    $scope.index      = $index;
                    $scope.selectItem = $scope.items[$index];
                    $scope.editItem = _.cloneDeep($scope.selectItem);

                    $uibModal.open({
                        templateUrl : './components/modal/items/modal.edit.html',
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
