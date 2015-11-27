angular.module('webApp')
    .controller('UsersController', ['$scope', '$uibModal', '$UsersService',
            function($scope, $uibModal,  $UsersService) {
                //データ取得
                    $UsersService.findAll($scope);

                //$scope宣言
                    $scope.alerts = [];
                    $scope.apiName = 'users';

                    //Usersデータ登録
                    $scope.registerItem = function() {
                        $UsersService.save($scope, $scope.newUser);
                    };
// ----------------------------------------------- モーダル呼び出し -----------------------------------------------//
                //編集モーダル呼び出し
                $scope.showEditModal = function($index) {
                    $scope.index      = $index;
                    $scope.selectUser = $scope.users[$index];
                    $scope.editUser = _.cloneDeep($scope.selectUser);
                    console.log($scope.editUser);
                    $uibModal.open({
                        templateUrl : './components/modal/users/modal.edit.html',
                        scope       : $scope,
                        controller  : 'ModalController',
                        backdrop    : 'static',
                        size        : 'lg'
                    });
                };

                //削除モーダル呼び出し
                $scope.showDeleteModal = function($index) {
                    $scope._id   = $scope.users[$index]._id;
                    $scope.index = $index;
                    $uibModal.open({
                        controller  : 'ModalController',
                        backdrop    : 'static',
                        scope       : $scope,
                        templateUrl : './components/modal/modal.delete.html'
                    });
                };
    }]);
