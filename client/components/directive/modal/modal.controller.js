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

        $scope.$watch('files', (newValue, oldValue) => {

            if (oldValue) {
                for (var i in oldValue) {
                  $scope.files.push(oldValue[i]);
                }
            }

            if ($scope.files && $scope.files.length > 5) {
                $scope.files.splice(0, $scope.files.length - 5);
            }
        });
}]);
