angular.module('webApp')
    .controller('ModalController', ['$http', '$scope', '$uibModalInstance', '$ItemsService', function($http, $scope, $uibModalInstance, $ItemsService) {

        //更新ボタン 処理
        $scope.update = function() {
            $ItemsService.update($scope, 'api/items/');
        };

        //削除ボタン 処理
        $scope.delete = function() {
            $ItemsService.delete($scope, 'api/items/');
        };

        //キャンセルボタン 処理
        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };
    }]);
