angular.module('webApp')
    .service('$CommentsService', ['$http', '$state', '$timeout', '$$Alert', function($http, $state, $timeout, $$Alert) {

        /**
         * Items データ全件出力
         */
        this.findAll = function(scope) {

            $http.get('/api/items')
                .success(function(data) {
                    scope.items = data;
                });
        };

        /**
         * Items 新規登録処理
         */
        this.save = function(scope, postData) {
            $http.post('/api/items', postData)
                .success(function(data) {
                    if(data.type) {

                        scope.alerts.push($$Alert.failureRegister);

                        console.log(data.type);
                        console.log(data.message);

                        $timeout(function() {
                            scope.alerts.splice(0, 1);
                        }, 1800);

                    } else {

                        $timeout(function() {
                            scope.alerts.splice(0, 1);
                        }, 1800);

                        $state.go('items');
                        return data;
                    }
                });
        };

        /**
         * Items 編集処理
         */
        this.update = function(scope) {

            $http.put('/api/items/' + scope.editItem._id, scope.editItem)
                .success(function(data) {

                    scope.items[scope.index] = data;
                    scope.$dismiss();
                    scope.alerts.push($$Alert.successUpdate);

                    $timeout(function() {
                        scope.alerts.splice(0, 1);
                    }, 1800);
                });
        };

        /**
         * Items 削除処理
         */
        this.delete = function(scope) {
            $http.delete('/api/items/' + scope._id)
                .success(function() {
                    scope.$dismiss();
                    scope.items.splice(scope.index, 1);
                    scope.alerts.push($$Alert.successDelete);
                    $timeout(function() {
                        scope.alerts.splice(0, 1);
                    }, 1800);
                });
        };

}]);
