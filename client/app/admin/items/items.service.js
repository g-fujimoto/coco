angular.module('webApp')
    .service('$ItemsService', ['$http', '$state', '$timeout', function($http, $state, $timeout) {

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
                        scope.items.push(data);
                        $state.go('items');
                    }
                });
        };

        /**
         * Items 削除処理
         */
        this.delete = function(scope, apiUrl) {
            $http.delete(apiUrl + scope.id)
                .success(function(data) {
                    console.log(scope);
                    scope.$dismiss();
                    scope.items.splice(scope.index, 1);
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
                });
        };
}]);
