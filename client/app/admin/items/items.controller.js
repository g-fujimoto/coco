angular.module('webApp')
    .controller('ItemsController', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {

                //アラート用の空の配列を作成
                $scope.alerts = [];

                //アイテム情報全件表示
                $http.get('/api/admin/items')
                    .success(function(data) {
                        console.log(data);
                        $scope.items = data;
                    });

                $scope.create = function() {
                    $http.post('/api/admin/items', {
                        itemName: '八百屋'
                    })
                    .success(function(data) {
                        console.log(data);
                    });
                };
    }]);
