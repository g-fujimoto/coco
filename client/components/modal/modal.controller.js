angular.module('webApp')
    .controller('ModalController', ['$http', '$scope', '$uibModalInstance', '$ItemsService', function($http, $scope, $uibModalInstance, $ItemsService) {


        //削除処理
        $scope.delete = function() {
            $ItemsService.delete($scope, 'api/admin/items/');
        };

        //更新処理
        $scope.update = function() {
            $ItemsService.update($scope, 'api/admin/items/');
        };

        //キャンセルボタン押下処理
        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };
    }]);
