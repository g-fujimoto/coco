angular.module('webApp')
    .service('$Users', ['$resource', '$http', '$state', '$rootScope', ($resource, $http, $state, $rootScope) => {
        this.Users = $resource(
            '/api/users/:_id',
            {_id: '@_id'},
            {update: {method: 'PUT'}}
        );

        this.Users.login = (scope, admin) => {
            var data      = {};
            data.email    = scope.email;
            data.password = scope.password;

            if(admin) {
                $http.post('/api/users/login', data)
                    .success((data) => {
                        if(data.isLogin) {
                            $state.go('items');
                            scope.$root.isLogin = true;
                        } else {
                            scope.$root.error = true;
                            var panel = document.getElementById('loginPanel');
                            angular.element(panel).addClass('animated shake');
                            angular.element(panel).on('webkitAnimationEnd mozAnimationeEnd MSAnimationEnd oanimationend animationend', () => {
                                angular.element(panel).removeClass('animated shake');
                            });
                        }
                    });
            } else {
                $http.post('/api/users/login', data)
                    .success((data) => {
                        console.log(data);
                        if(data.isLogin) {
                            $state.go('main');
                            $rootScope.isLogin = true;
                        } else {
                            scope.$root.error = true;
                            var panel = document.getElementById('loginPanel');
                            angular.element(panel).addClass('animated shake');
                            angular.element(panel).on('webkitAnimationEnd mozAnimationeEnd MSAnimationEnd oanimationend animationend', () => {
                                angular.element(panel).removeClass('animated shake');
                            });
                        }
                    });
            }
        };

        this.Users.stateCheck = () => {
            $http.post(
                '/api/users/stateCheck',
                {}
            )
            .success((data) => {
                console.log(data);
                if(data.isLogin) {
                    console.log('ログイン状態だよ');
                } else {
                    console.log('未ログイン状態だよ');
                }
            });
        };

        this.Users.logout = () => {
            $http.post(
                '/api/users/logout',
                {}
            )
            .success(() => {
                $rootScope.isLogin = false;
                $state.go('login');
            });
        };


        return this.Users;
    }]);
