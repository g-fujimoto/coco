angular.module('webApp')
    .controller('ItemsController', ['$scope', '$Areas', '$$Genres', '$$Prefs', '$Items', '$$Alert', '$timeout', '$state',
            function($scope, $Areas, $$Genres, $$Prefs, $Items, $$Alert, $timeout, $state) {
// ----------------------------------------------- $scope -----------------------------------------------//
                    $scope.alerts  = [];
                    $scope.apiName = 'items';
                    $scope.genres  = $$Genres;
                    $scope.prefs   = $$Prefs;

// ----------------------------------------------- RESTful API -----------------------------------------------//
                //データ全件取得
                $scope.areas   = $Areas.query();
                $scope.datas   = $Items.query();

                //データ個別取得

                //データ新規作成
                $scope.saveAPI = () => {
                    $Items.save(
                        $scope.newData,
                        () => {
                            $scope.datas = $Items.query();
                            $scope.alerts.push($$Alert.successSave);
                            $scope.datas.splice($scope.index, 1);
                            $timeout(() => {
                                $scope.alerts.splice(0, 1);
                            }, 1800);
                            $state.go('items');
                        }
                    );
                };

                //データ更新
                $scope.editAPI = (data) => {
                    $Items.update(
                        data,
                        () => {
                            $scope.datas = $Items.query();
                            $scope.alerts.push($$Alert.successUpdate);
                            $scope.datas.splice($scope.index, 1);
                            $timeout(() => {
                                $scope.alerts.splice(0, 1);
                            }, 1800);
                        }
                    );
                };

                //データ削除
                $scope.deleteAPI = () => {
                    console.log($scope.data);
                    // $Items.delete(
                        // {_id: $scope.data._id},
                        // () => {
                        //     $scope.datas = $Items.query();
                        //     $scope.$dismiss();
                        //     $scope.alerts.push($$Alert.successDelete);
                        //     $scope.datas.splice($scope.index, 1);
                        //     $timeout(() => {
                        //         $scope.alerts.splice(0, 1);
                        //     }, 1800);
                        // }
                    // );
                };

    }]);
