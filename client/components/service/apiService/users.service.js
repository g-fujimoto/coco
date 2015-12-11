angular.module('webApp')
    .service('$Users', ['$resource', '$http', '$state', '$rootScope', '$timeout', ($resource, $http, $state, $rootScope, $timeout) => {
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
                $http.post('/api/users/adminLogin', data)
                    .success((data) => {
                        if(data) {
                            $rootScope.adminLoginUser = data;
                            $rootScope.isAdminLogin   = true;
                            $state.go('items');
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
                            $rootScope.isLogin   = true;
                            $rootScope.loginUser = data;
                            $state.go('main');
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
                if(data.session) {
                    $rootScope.isLogin   = true;
                    $rootScope.loginUser = data.session;
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
                    var adminFlg = true;
                    if(adminFlg) {
                        $rootScope.adminLoginUser = false;
                        $rootScope.isAdminLogin   = false;
                        $state.go('admin');
                    } else {
                        $rootScope.isLogin   = false;
                        $rootScope.loginUser = '';
                        $state.reload();
                    }
                });
        };

        return this.Users;
    }]);
