'use strict';

angular.module('webApp').service('$Users', ['$resource', '$http', '$state', '$rootScope', '$timeout', function ($resource, $http, $state, $rootScope, $timeout) {
    undefined.Users = $resource('/api/users/:_id', { _id: '@_id' }, { update: { method: 'PUT' } });

    undefined.Users.login = function (scope, adminFlg) {
        var data = {};
        data.email = scope.email;
        data.password = scope.password;

        // Admin or Public
        if (adminFlg) {
            $http.post('/api/users/adminLogin', data).success(function (data) {
                if (data) {
                    $rootScope.adminLoginUser = data;
                    $rootScope.isAdminLogin = true;
                    $state.go('items');
                } else {
                    $rootScope.error = true;
                    var panel = document.getElementById('loginPanel');
                    angular.element(panel).addClass('animated shake');
                    angular.element(panel).on('webkitAnimationEnd mozAnimationeEnd MSAnimationEnd oanimationend animationend', function () {
                        angular.element(panel).removeClass('animated shake');
                    });
                }
            });
        } else {
            $http.post('/api/users/login', data).success(function (data) {
                if (data) {
                    $rootScope.isLogin = true;
                    $rootScope.loginUser = data;
                    $state.go('main', {
                        fromLogin: true
                    });
                } else {
                    scope.$root.error = true;
                    var panel = document.getElementById('login_box');
                    angular.element(panel).addClass('animated shake');
                    angular.element(panel).on('webkitAnimationEnd mozAnimationeEnd MSAnimationEnd oanimationend animationend', function () {
                        angular.element(panel).removeClass('animated shake');
                    });
                }
            });
        }
    };

    undefined.Users.stateCheck = function (adminFlg, stateName) {
        $http.post('/api/users/stateCheck', {}).success(function (data) {
            if (adminFlg) {
                if (data.session) {
                    $rootScope.isAdminLogin = true;
                    $rootScope.adminLoginUser = data.session;
                } else {
                    if (!$rootScope.isAdminLogin) {
                        $state.go('admin');
                    } else {
                        $rootScope.isAdminLogin = false;
                        $rootScope.adminLoginUser = '';
                        $state.go('admin');
                    }
                }
            } else {
                if (stateName === 'items' || stateName === 'users' || stateName === 'comments') {
                    $rootScope.isLogin = false;
                    $rootScope.loginUser = false;
                    $rootScope.isAdminLogin = false;
                    $rootScope.adminLoginUser = false;
                    $state.go('admin');
                } else {
                    if (data.session) {
                        $rootScope.isLogin = true;
                        $rootScope.loginUser = data.session;
                    } else {
                        console.log('helloworld');
                        $rootScope.isLogin = false;
                        $rootScope.loginUser = '';
                        $state.go('login');
                    }
                }
            }
        });
    };

    undefined.Users.logout = function (adminFlg) {
        $http.post('/api/users/logout', {}).success(function () {
            if (adminFlg) {
                $rootScope.adminLoginUser = false;
                $rootScope.isAdminLogin = false;
                $state.go('admin');
            } else {
                $rootScope.isLogin = false;
                $rootScope.loginUser = '';
                $state.go('login');
            }
        });
    };

    return undefined.Users;
}]);