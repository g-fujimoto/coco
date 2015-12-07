angular.module('webApp')
    .controller('ItemsController', ['$scope', '$Areas', '$$Genres', '$$Prefs', '$Items', '$$Alerts', '$timeout', '$state', '$stateParams',
            function($scope, $Areas, $$Genres, $$Prefs, $Items, $$Alerts, $timeout, $state, $stateParams) {
// ----------------------------------------------- $scope ----------------------------------------------------//
                    $scope.alerts  = [];
                    if($stateParams.alert) {
                        $scope.alerts.push($stateParams.alert);
                        $timeout(() => {
                            $scope.alerts.splice(0, 1);
                        }, 1800);
                    }

                    $scope.apiName = 'items';
                    $scope.genres  = $$Genres;
                    $scope.prefs   = $$Prefs;

// ----------------------------------------------- RESTful API -----------------------------------------------//
                //データ全件取得
                $scope.areas   = $Areas.query();
                $scope.datas   = $Items.query();

                //データ新規作成
                $scope.saveAPI = () => {
                    // ------ dummy ----- //
                    $scope.newData.sceneAve = 3.2;
                    // ------------------ //
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
                $scope.updateAPI = (data) => {
                    $Items.update(
                        data,
                        () => {
                            $scope.datas = $Items.query();
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
                        }
                    );
                };

    }]);
