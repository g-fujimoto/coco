angular.module('webApp')
    .service('$Users', ['$resource', '$http', ($resource, $http) => {
        this.Users = $resource(
            '/api/users/:_id',
            {_id: '@_id'},
            {update: {method: 'PUT'}}
        );

        // ログイン
        this.Users.login = function($scope) {

            var data = {};
            data.email = $scope.email;
            data.password = $scope.password;

            $http.post('/api/users/login', JSON.stringify(data))
            .success((data) => {
                return data;
            });
            return false;
        };

        return this.Users;
    }]);
