angular.module('webApp')
    .controller('UsersController', ['$scope', '$Users', '$$Alerts', '$timeout', '$state', '$stateParams',
            function($scope, $Users, $$Alerts, $timeout, $state, $stateParams) {
// ----------------------------------------------- $scope ----------------------------------------------------//
                    $scope.alerts = [];
                    if($stateParams.alert) {
                        $scope.alerts.push($stateParams.alert);

                        $timeout(() => {
                            $scope.alerts.splice(0, 1);
                        }, 1800);
                    }
                    $scope.apiName = 'users';
                    $scope.newData = {};
                    $scope.newData.aboutWorks = [{
                            title    : undefined,
                            body     : undefined,
                            disabled : true,
                            button   : true,
                            label    : true
                        }];
                    $scope.newData.others = [{
                            title    : undefined,
                            body     : undefined,
                            disabled : true,
                            button   : true,
                            label    : true
                        }];
                    $scope.addAboutWorks = function() {
                        $scope.newData.aboutWorks.push({
                            title    : undefined,
                            body     : undefined,
                            disabled : false,
                            button   : false,
                            label    : false
                        });
                    };

                    $scope.addOthers = function() {
                        $scope.newData.others.push({
                            title    : undefined,
                            body     : undefined,
                            disabled : false,
                            button   : false,
                            label    : false
                        });
                    };
// ----------------------------------------------- $watch ----------------------------------------------------//
                    $scope.stopAboutWorks = $scope.$watch('newData.aboutWorks', (newValue) => {
                                                angular.forEach(newValue, (element, index) => {
                                                    if(newValue[index].title && newValue[index].body) {
                                                        newValue[0].disabled = false;
                                                    } else {
                                                        newValue[0].disabled = true;
                                                    }
                                                });
                                            }, true);

                    $scope.stopOthers = $scope.$watch('newData.others', (newValue) => {
                                                angular.forEach(newValue, (element, index) => {
                                                    if(newValue[index].title && newValue[index].body) {
                                                        newValue[0].disabled = false;
                                                    } else {
                                                        newValue[0].disabled = true;
                                                    }
                                                });
                                            }, true);

// ----------------------------------------------- RESTful API -----------------------------------------------//
                    // データ全件取得
                    $scope.datas = $Users.query();

                    //データ新規作成
                    $scope.saveAPI = () => {
                        $Users.save(
                            $scope.newData,
                            () => {
                                $scope.datas = $Users.query();
                                $state.go('users', {
                                    alert: $$Alerts.successSave
                                });
                            }
                        );
                    };

                    //データ更新
                    $scope.updateAPI = (data) => {
                        $Users.update(
                            data,
                            () => {
                                $scope.datas = $Users.query();
                                $scope.alerts.push($$Alerts.successUpdate);
                                $scope.datas.splice($scope.index, 1);
                                $timeout(() => {
                                    $scope.alerts.splice(0, 1);
                                }, 1800);
                            }
                        );
                    };

                    //データ削除
                    $scope.deleteAPI = (scope) => {
                        $Users.delete(
                            {_id: scope.data._id},
                            () => {
                                $scope.datas = $Users.query();
                                $scope.alerts.push($$Alerts.successDelete);
                                $scope.datas.splice($scope.index, 1);
                                scope.$dismiss();
                                $timeout(() => {
                                    $scope.alerts.splice(0, 1);
                                }, 1800);
                            }
                        );
                    };

    }]);
