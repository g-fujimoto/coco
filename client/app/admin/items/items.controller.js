angular.module('webApp')
    .controller('ItemsController', ['$scope', '$Areas', '$$Genres', '$$Prefs', '$Items', '$$Alerts', '$timeout', '$state', '$stateParams', '$$Exists', '$$Weeks',
            function($scope, $Areas, $$Genres, $$Prefs, $Items, $$Alerts, $timeout, $state, $stateParams, $$Exists, $$Weeks) {
// ----------------------------------------------- $scope ----------------------------------------------------//
                    $scope.alerts       = [];
                    if($stateParams.alert) {
                        $scope.alerts.push($stateParams.alert);
                        $timeout(() => {
                            $scope.alerts.splice(0, 1);
                        }, 1800);
                    }
                    $scope.apiName = 'items';
                    $scope.genres  = $$Genres;
                    $scope.prefs   = $$Prefs;
                    $scope.exists  = $$Exists;
                    $scope.weeks   = $$Weeks;
                    $scope.smokes = [
                        {
                            label: '禁煙',
                            value: 0
                        },
                        {
                            label: '分煙',
                            value: 1
                        },
                        {
                            label: '喫煙',
                            value: 2
                        }
                    ];

// ----------------------------------------------- RESTful API -----------------------------------------------//
                //データ全件取得
                $scope.areas   = $Areas.query();
                $scope.datas   = $Items.query();

                //データ新規作成
                $scope.saveAPI = () => {
                    $scope.newData.registerId = $scope.$root.adminLoginUser._id;
                    $scope.newData.registerUser = $scope.$root.adminLoginUser.lastName + ' ' + $scope.$root.adminLoginUser.firstName;
                    $Items.save(
                        $scope.newData,
                        () => {
                            $scope.datas = $Items.query();
                            $timeout(() => {
                                $scope.alerts.splice(0, 1);
                            }, 1800);
                            $state.go('items', {
                                alert: $$Alerts.successSave
                            });
                        }
                    );
                };

                //データ更新
                $scope.updateAPI = (data, scope) => {
                    $Items.update(
                        data,
                        () => {
                            $scope.datas = $Items.query();
                            $scope.alerts.push($$Alerts.successUpdate);
                            $scope.datas.splice($scope.index, 1);
                            $timeout(() => {
                                $scope.alerts.splice(0, 1);
                            }, 1800);
                            scope.$dismiss();
                        }
                    );
                };

                //データ削除
                $scope.deleteAPI = (data, scope) => {
                    $Items.delete(
                        {_id: scope.data._id},
                        () => {
                            $scope.datas = $Items.query();
                            $scope.alerts.push($$Alerts.successDelete);
                            $scope.datas.splice($scope.index, 1);
                            scope.$dismiss();
                            $timeout(() => {
                                $scope.alerts.splice(0, 1);
                            }, 1800);
                            scope.$dismiss();
                        }
                    );
                };

    }]);
