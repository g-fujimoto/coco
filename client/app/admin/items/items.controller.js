angular.module('webApp')
    .controller('ItemsController', ['$scope', '$Areas', '$$Genres', '$$Prefs', '$Items',
            function($scope, $Areas, $$Genres, $$Prefs, $Items) {
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

                //データ更新
                $scope.showEditModal = function($index) {
                    $scope.index      = $index;
                    $scope.selectItem = $scope.datas[$index];
                    $scope.editItem = _.cloneDeep($scope.selectItem);
                };

                //データ削除
                $scope.deleteAPI = (_id, scope) => {
                    $Items.delete(
                        {_id},
                        () => {
                            $scope.datas = $Comments.query();
                            scope.$dismiss();
                            $scope.alerts.push($$Alert.successDelete);
                            $scope.datas.splice($scope.index, 1);
                            $timeout(() => {
                                $scope.alerts.splice(0, 1);
                            }, 1800);
                        }
                    );

    })];
