angular.module('webApp')
    .service('$ItemsService', ['$http', '$state', '$timeout', '$$Alert', function($http, $state, $timeout, $$Alert) {

        /**
         * Items データ全件出力
         */
        this.findAll = function(scope) {
            $http.get('/api/admin/items')
                .success(function(data) {
                    scope.items = data;
                });
        };

        /**
         * Items 新規登録処理
         */
        this.save = function(scope, postData) {
            $http.post('/api/admin/items', postData)
                .success(function(data) {
                    if(data === 'error') {
                        console.log('エラーだよ');
                    } else {
                        console.log(data);
                        scope.items.push(data);
                        scope.alerts.push($$Alert.successRegister);
                        $timeout(function() {
                            scope.alerts.splice(0, 1);
                        }, 1800);
                        $state.go('items');
                    }
                });
        };

        /**
         * Items 削除処理
         */
        this.delete = function(scope, apiUrl) {
            $http.delete(apiUrl + scope._id)
                .success(function(data) {
                    scope.$dismiss();
                    scope.items.splice(scope.index, 1);
                    scope.alerts.push($$Alert.successDelete);
                    $timeout(function() {
                        scope.alerts.splice(0, 1);
                    }, 1800);
                });
        };

        /**
         * Items 編集処理
         */
        this.update = function(scope, apiUrl) {
            $http.put(apiUrl + scope.selectRow._id, scope.selectRow)
                .success(function(data) {
                    scope.items[scope.index] = data;
                    scope.$dismiss();
                    scope.alerts.push($$Alert.successUpdate);
                    $timeout(function() {
                        scope.alerts.splice(0, 1);
                    }, 1800);

                });
        };
}]);
