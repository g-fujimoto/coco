angular.module('webApp')
    .controller('ModalController', ['$http', '$scope', '$uibModalInstance', '$ItemsService', function($http, $scope, $uibModalInstance, $ItemsService) {

        //ジャンル・シーン編集時、selectRow.genre.nameを監視
        $scope.$watch('selectRow.genre.name', function(newValue, oldValue) {
            if(!angular.isUndefined($scope.selectRow)) {
                $scope.selectGenre = true;
            } else {
                $scope.selectGenre = false;
            }
        });

        //ジャンル・シーン編集時、selectRow.scene.nameを監視
        $scope.$watch('selectRow.scene.name', function(newValue, oldValue) {
            if(!angular.isUndefined($scope.selectRow)) {
                $scope.selectScene = true;
            } else {
                $scope.selectScene = false;
            }
        });

        //削除ボタン 処理
        $scope.delete = function() {
            $ItemsService.delete($scope, 'api/admin/items/');
        };

        //更新ボタン 処理
        $scope.update = function() {
            $ItemsService.update($scope, 'api/admin/items/');
        };

        //キャンセルボタン 処理
        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };
    }]);
