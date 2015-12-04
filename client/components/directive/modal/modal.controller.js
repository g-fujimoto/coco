angular.module('webApp')
    .controller('ModalController', ['$scope', 'Upload', '$uibModalInstance',
     function($scope, Upload, $uibModalInstance) {
         //キャンセルボタン 処理
         $scope.cancel = function() {
             $uibModalInstance.dismiss();
         };

         $scope.delete = () => {
            $scope.deleteAPI($scope);
         };

        //更新ボタン 処理
        // $scope.update = function() {
        //
        //     if($scope.modalOption.files && $scope.modalOption.files.length) {
        //         for(var i = 0; i < $scope.modalOption.files.length; i++) {
        //             var file = $scope.modalOption.files[i];
        //             Upload.upload({
        //                 file,
        //                 url: '/api/upload'
        //             })
        //             .success(() => {
        //                 console.log(`アップロード完了：#{config.file.name}`);
        //             });
        //         }
        //     }
        // };
    }]);
