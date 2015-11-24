angular.module('webApp')
    .controller('ModalController', ['$http', '$scope', '$uibModalInstance', '$modalService', function($http, $scope, $uibModalInstance, $modalService) {


        //削除処理
        $scope.delete = function() {
            console.log('delete!');
        };

        //キャンセルボタン押下処理
        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };
    }]);
