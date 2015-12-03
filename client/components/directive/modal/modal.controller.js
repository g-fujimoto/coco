angular.module('webApp')
    .controller('ModalController', ['$scope', 'Upload', '$uibModalInstance',
     function($scope, Upload, $uibModalInstance) {
         //キャンセルボタン 処理
         $scope.cancel = function() {
             $uibModalInstance.dismiss();
         };

         $scope.delete = () => {
             console.log($scope.hello);
         };

        //更新ボタン 処理
        // $scope.update = function(apiName) {
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
            //
            // switch() {
            //     case 'items' :
            //         var api = {
            //             service : $ItemsService,
            //             name : 'items'
            //         };
            //         api.service.update($scope, 'api/' + api.name + '/');
            //         break;
            //     case 'users' :
            //         api = {
            //             service : $UsersService,
            //             name : 'users'
            //         };
            //         api.service.update($scope, 'api/' + api.name + '/');
            //         break;
            //     case 'comments' :
            //         $scope.updateComment($scope);
            //         break;
            // }
        // };


    }]);
