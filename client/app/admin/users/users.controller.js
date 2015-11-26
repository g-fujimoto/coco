angular.module('webApp')
    .controller('UsersController', ['$scope', '$uibModal', '$UsersService',
            function($scope, $uibModal,  $UsersService) {

                //$scope宣言
                $scope.alerts = [];

                //Users全件出力
                $UsersService.findAll($scope);

                //Usersデータ登録
                $scope.registerItem = function() {
                    // console.log($scope);
                    $UsersService.save($scope, $scope.newItem);
                };

// ----------------------------------------------- モーダル呼び出し -----------------------------------------------//

                //編集モーダル呼び出し
                $scope.showEditModal = function($index) {
                    $scope.index      = $index;
                    $scope.selectUser = $scope.users[$index];
                    $scope.editUser   = {
                        _id       : $scope.selectUser._id,
                        name      : $scope.selectUser.name,
                        branch    : $scope.selectUser.branch,
                        area      : $scope.selectUser.area,
                        kana      : $scope.selectUser.kana,
                        otherName : $scope.selectUser.otherName,
                        tel       : $scope.selectUser.tel,
                        genreName : $scope.selectUser.genreName,
                        address   : {
                            postalCode : $scope.selectUser.address.postalCode,
                            pref       : $scope.selectUser.address.pref,
                            city       : $scope.selectUser.address.city,
                            town       : $scope.selectUser.address.town,
                            building   : $scope.selectUser.address.building
                        }
                    };

                    $uibModal.open({
                        templateUrl : './components/modal/modal.edit.html',
                        scope       : $scope,
                        controller  : 'ModalController',
                        backdrop    : 'static'
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
