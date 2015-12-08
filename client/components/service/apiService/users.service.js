angular.module('webApp')
    .service('$Users', ['$resource', '$http', '$state', '$timeout', ($resource, $http, $state) => {
        this.Users = $resource(
            '/api/users/:_id',
            {_id: '@_id'},
            {update: {method: 'PUT'}}
        );

        // ログイン
        this.Users.login = function(scope) {

            var data      = {};
            data.email    = scope.email;
            data.password = scope.password;

            $http.post('/api/users/login', data)
            .success((data) => {
                if(data.login) {
                    // $state.go('items');
                } else {
                    scope.error = true;
                    var panel = document.getElementById('loginPanel');
                    angular.element(panel).addClass('animated shake');
                    angular.element(panel).on('webkitAnimationEnd mozAnimationeEnd MSAnimationEnd oanimationend animationend', () => {
                        angular.element(panel).removeClass('animated shake');
                    });
                }
            });
        };
        return this.Users;
    }]);
