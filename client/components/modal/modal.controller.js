angular.module('webApp')
    .controller('ModalController', ['$http', '$scope', '$uibModalInstance', '$ItemsService', function($http, $scope, $uibModalInstance, $ItemsService) {


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
