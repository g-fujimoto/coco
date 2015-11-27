angular.module('webApp')
    .controller('ModalController', ['$http', '$scope', '$uibModalInstance', '$ItemsService', '$UsersService',
     function($http, $scope, $uibModalInstance, $ItemsService, $UsersService) {

        //更新ボタン 処理
        $scope.update = function() {
            $ItemsService.update($scope, 'api/items/');
        };

        //削除ボタン 処理
        $scope.delete = function(apiName) {

            switch(apiName) {
                case 'items' :
                    var api = {
                        service : $ItemsService,
                        name : 'items'
                    };
                    break;
                case 'users' :
                    var api = {
                        service : $UsersService,
                        name : 'users'
                    };
                    break;
            }

            api.service.delete($scope, 'api/' + api.name + '/');
        };

        //キャンセルボタン 処理
        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };
    }]);
