angular.module('webApp')
    .controller('UsersController', ['$scope', '$uibModal', '$UsersService',
            function($scope, $uibModal,  $UsersService) {
                //getData
                    $UsersService.findAll($scope);
                //$scope
                    $scope.alerts = [];
                    $scope.apiName = 'users';
                    $scope.newUser = {};
                    $scope.newUser.aboutWorks = [{
                            title: undefined,
                            body : undefined,
                            disabled : true,
                            button   : true,
                            label: true
                        }];
                    $scope.newUser.others = [{
                            title: undefined,
                            body : undefined,
                            disabled : true,
                            button   : true,
                            label: true
                        }];

                    //Usersデータ登録
                    $scope.registerItem = function() {
                        
                        $UsersService.save($scope, $scope.newUser);
                    };

                    $scope.addAboutWorks = function() {
                        $scope.newUser.aboutWorks.push({
                            title: undefined,
                            body: undefined,
                            disabled: false,
                            button: false,
                            label: false
                        });
                    };

                    $scope.addOthers = function() {
                        $scope.newUser.others.push({
                            title: undefined,
                            body: undefined,
                            disabled: false,
                            button: false,
                            label: false
                        });
                    };

                //$watch
                    $scope.stopAboutWorks = $scope.$watch('newUser.aboutWorks', function(newValue, oldValue, scope) {
                                                angular.forEach(newValue, function(element, index) {
                                                    if(newValue[index].title && newValue[index].body) {
                                                        newValue[0].disabled = false;
                                                    } else {
                                                        newValue[0].disabled = true;
                                                    }
                                                });
                                            }, true);

                    $scope.stopOthers = $scope.$watch('newUser.others', function(newValue, oldValue, scope) {
                                                angular.forEach(newValue, function(element, index) {
                                                    if(newValue[index].title && newValue[index].body) {
                                                        newValue[0].disabled = false;
                                                    } else {
                                                        newValue[0].disabled = true;
                                                    }
                                                });
                                            }, true);





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

                    $scope

                    $uibModal.open({
                        controller  : 'ModalController',
                        backdrop    : 'static',
                        scope       : $scope,
                        templateUrl : './components/modal/modal.delete.html'
                    });
                };
    }]);
