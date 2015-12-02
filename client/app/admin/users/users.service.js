angular.module('webApp')
    .service('$UsersService', ['$http', '$state', '$timeout', '$$Alert', function($http, $state, $timeout, $$Alert) {
        /**
         * Users 新規登録処理
         */
        this.save = function(scope, postData) {
            $http.post('/api/users', postData)
                .success(function(data) {
                    if(data.type) {
                        scope.alerts.push($$Alert.failureRegister);
                        $timeout(() => {
                            scope.alerts.splice(0, 1);
                        }, 1800);

                    } else {
                        scope.alerts.push($$Alert.successRegister);
                        $timeout(() => {
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

                    $timeout(() => {
                        scope.alerts.splice(0, 1);
                    }, 1800);
                });
        };

        /**
         * Users 削除処理
         */
        this.delete = function(scope) {
            $http.delete(`/api/users/${scope._id}`)
                .success(() => {
                    scope.$dismiss();
                    scope.datas.splice(scope.index, 1);
                    scope.alerts.push($$Alert.successDelete);
                    $timeout(() => {
                        scope.alerts.splice(0, 1);
                    }, 1800);
                });
        };

}]);
