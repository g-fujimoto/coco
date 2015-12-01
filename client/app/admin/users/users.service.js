angular.module('webApp')
    .service('$UsersService', ['$http', '$state', '$timeout', '$$Alert', function($http, $state, $timeout, $$Alert) {

        /**
         * Users データ全件出力
         */
        this.findAll = function(scope) {

            $http.get('/api/users')
                .success(function(data) {
                    scope.users = data;
                    scope.datas = data;
                });
        };

        /**
         * Users 新規登録処理
         */
        this.save = function(scope, postData) {
            $http.post('/api/users', postData)
                .success(function(data) {
                    if(data.type) {
                        scope.alerts.push($$Alert.failureRegister);

                        console.log(data.type);
                        console.log(data.message);

                        $timeout(function() {
                            scope.alerts.splice(0, 1);
                        }, 1800);

                    } else {
                        scope.alerts.push($$Alert.successRegister);
                        $timeout(function() {
                            scope.alerts.splice(0, 1);
                        }, 1800);

                        $state.go('users');
                        return data;
                    }
                });
        };

        /**
         * Users 編集処理
         */
        this.update = function(scope) {

            $http.put('/api/users/' + scope.editUser._id, scope.editUser)
                .success(function(data) {

                    scope.users[scope.index] = data;
                    scope.$dismiss();
                    scope.alerts.push($$Alert.successUpdate);

                    $timeout(function() {
                        scope.alerts.splice(0, 1);
                    }, 1800);
                });
        };

        /**
         * Users 削除処理
         */
        this.delete = function(scope) {
            $http.delete('/api/users/' + scope._id)
                .success(function() {
                    scope.$dismiss();
                    scope.users.splice(scope.index, 1);
                    scope.alerts.push($$Alert.successDelete);
                    $timeout(function() {
                        scope.alerts.splice(0, 1);
                    }, 1800);
                });
        };

}]);
