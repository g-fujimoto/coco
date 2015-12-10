angular.module('webApp')
    .service('$Users', ['$resource', '$http', '$state', '$rootScope', ($resource, $http, $state, $rootScope) => {
        this.Users = $resource(
            '/api/users/:_id',
            {_id: '@_id'},
            {update: {method: 'PUT'}}
        );

        this.Users.login = (scope, adminFlg) => {
            var data      = {};
            data.email    = scope.email;
            data.password = scope.password;

            // Admin or Public
            if(adminFlg) {
                $http.post('/api/users/login', data)
                    .success((data) => {
                        if(data) {
                            $state.go('items');
                            $rootScope.isLogin = true;
                            $rootScope.loginUser  = data;
                        } else {
                            $rootScope.error = true;
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
                        if(data) {
                            $state.go('main');
                            $rootScope.isLogin   = true;
                            $rootScope.loginUser = data;
                        } else {
                            scope.$root.error = true;
                            var panel = document.getElementById('login_box');
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
                if(!$rootScope.loginUser) {
                    console.log('no loginUser');
                    $rootScope.isLogin = false;
                    $state.go('login');
                }
                if(data.isLogin) {
                    $rootScope.isLogin   = true;
                } else {
                    $rootScope.isLogin   = false;
                    $rootScope.loginUser = '';
                    $state.go('login');
                }
            });
        };

        this.Users.logout = () => {
                $http.post(
                    '/api/users/logout',
                    {}
                )
                .success(() => {
                    $rootScope.isLogin   = false;
                    $rootScope.loginUser = '';
                    $state.reload();
                });
        };


        return this.Users;
    }]);
