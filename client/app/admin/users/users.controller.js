angular.module('webApp')
    .controller('UsersController', ['$scope', '$uibModal', '$UsersService', '$Users',
            function($scope, $uibModal,  $UsersService, $Users) {
                //getData
                $scope.datas = $Users.query();
                //$scope
                    $scope.alerts = [];
                    $scope.apiName = 'users';
                    $scope.newUser = {};
                    $scope.newUser.aboutWorks = [{
                            title    : undefined,
                            body     : undefined,
                            disabled : true,
                            button   : true,
                            label    : true
                        }];
                    $scope.newUser.others = [{
                            title    : undefined,
                            body     : undefined,
                            disabled : true,
                            button   : true,
                            label    : true
                        }];

                    //Usersデータ登録
                    $scope.registerItem = function() {

                        $UsersService.save($scope, $scope.newUser);
                    };

                    $scope.addAboutWorks = function() {
                        $scope.newUser.aboutWorks.push({
                            title    : undefined,
                            body     : undefined,
                            disabled : false,
                            button   : false,
                            label    : false
                        });
                    };

                    $scope.addOthers = function() {
                        $scope.newUser.others.push({
                            title    : undefined,
                            body     : undefined,
                            disabled : false,
                            button   : false,
                            label    : false
                        });
                    };

                //$watch
                    $scope.stopAboutWorks = $scope.$watch('newUser.aboutWorks', (newValue) => {
                                                angular.forEach(newValue, (element, index) => {
                                                    if(newValue[index].title && newValue[index].body) {
                                                        newValue[0].disabled = false;
                                                    } else {
                                                        newValue[0].disabled = true;
                                                    }
                                                });
                                            }, true);

                    $scope.stopOthers = $scope.$watch('newUser.others', (newValue) => {
                                                angular.forEach(newValue, (element, index) => {
                                                    if(newValue[index].title && newValue[index].body) {
                                                        newValue[0].disabled = false;
                                                    } else {
                                                        newValue[0].disabled = true;
                                                    }
                                                });
                                            }, true);

    }]);
