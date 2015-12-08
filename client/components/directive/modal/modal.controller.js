angular.module('webApp')
    .controller('ModalController', ['$scope', 'Upload', '$uibModalInstance',
     function($scope, Upload, $uibModalInstance) {

//--------------------- Kick -------------------- //
        //saveAPIをキック
        $scope.save = (newData) => {
            $scope.saveAPI(newData, $scope);
        };

        //updateAPIをキック
        $scope.update = (editData) => {
            $scope.updateAPI(editData, $scope);
        };

        //deleteAPIをキック
        $scope.delete = (data) => {
            $scope.deleteAPI(data, $scope);
        };

// ------------------- OtherFunction -------------------- //

         //キャンセルボタン
         $scope.cancel = function() {
             $uibModalInstance.dismiss();
         };

}]);
