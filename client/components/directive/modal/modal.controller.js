angular.module('webApp')
    .controller('ModalController', ['$scope', 'Upload', '$uibModalInstance',
     function($scope, Upload, $uibModalInstance) {

         //キャンセルボタン 処理
         $scope.cancel = function() {
             $uibModalInstance.dismiss();
         };

         //削除APIをキック
         $scope.delete = () => {
            $scope.deleteAPI($scope);
         };
    }]);
