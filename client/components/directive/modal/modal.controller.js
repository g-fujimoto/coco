angular.module('webApp')
    .controller('ModalController', ['$http', '$scope', '$uibModalInstance', '$ItemsService', '$UsersService', 'Upload',
     function($http, $scope, $uibModalInstance, $ItemsService, $UsersService, Upload) {

        //更新ボタン 処理
        $scope.update = function(apiName) {

            if($scope.modalOption.files && $scope.modalOption.files.length) {
                for(var i = 0; i < $scope.modalOption.files.length; i++) {
                    var file = $scope.modalOption.files[i];
                    Upload.upload({
                        url: '/api/upload',
                        file: file
                    })
                    .success(function(data, status, header, config) {
                        console.log('アップロード完了：' + config.file.name);
                    });
                }
            }

            switch(apiName) {
                case 'items' :
                    var api = {
                        service : $ItemsService,
                        name : 'items'
                    };
                    api.service.update($scope, 'api/' + api.name + '/');
                    break;
                case 'users' :
                    api = {
                        service : $UsersService,
                        name : 'users'
                    };
                    api.service.update($scope, 'api/' + api.name + '/');
                    break;
                case 'comments' :
                    $scope.updateComment($scope);
                    break;
            }
        };

        //削除ボタン 処理
        $scope.delete = function(apiName) {

            switch(apiName) {
                case 'items' :
                    var api = {
                        service : $ItemsService,
                        name : 'items'
                    };
                    api.service.delete($scope, 'api/' + api.name + '/');
                    break;
                case 'users' :
                    api = {
                        service : $UsersService,
                        name : 'users'
                    };
                    api.service.delete($scope, 'api/' + api.name + '/');
                    break;
                case 'comments' :
                    $scope.deleteComment($scope.$parent._id, $scope);
                    break;
            }
        };

        //キャンセルボタン 処理
        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };
    }]);
