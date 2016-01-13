'use strict';

angular.module('webApp')
// 削除モーダル表示属性
.directive('deleteModal', function ($uibModal) {
    return function (scope, element, attr) {
        element.on('click', function () {
            scope.data = angular.fromJson(attr.deleteModal);
            $uibModal.open({
                scope: scope,
                controller: 'ModalController',
                backdrop: 'static',
                templateUrl: './components/directive/modal/modal.delete.html'
            });
        });
    };
})
// 管理者更新モーダル表示属性
.directive('editModal', function ($uibModal) {
    return function (scope, element, attr) {
        element.on('click', function () {
            scope.editData = angular.fromJson(attr.editModal);
            $uibModal.open({
                scope: scope,
                controller: 'ModalController',
                backdrop: 'static',
                templateUrl: './components/directive/modal/admin/' + scope.apiName + '/modal.edit.html',
                size: 'lg'
            });
        });
    };
})
// プロフィール更新モーダル表示属性
.directive('editProfileModal', function ($uibModal) {
    return function (scope, element, attr) {
        element.on('click', function () {
            scope.editData = angular.fromJson(attr.editProfileModal);
            $uibModal.open({
                scope: scope,
                controller: 'ModalController',
                backdrop: 'static',
                templateUrl: './components/directive/modal/modal.edit.html',
                size: 'lg'
            });
        });
    };
})
// パスワード変更モーダル表示属性
.directive('editPasswordModal', function ($uibModal) {
    return function (scope, element, attr) {
        element.on('click', function () {
            scope.editData = angular.fromJson(attr.editModal);
            $uibModal.open({
                scope: scope,
                controller: 'ModalController',
                backdrop: 'static',
                templateUrl: './components/directive/modal/modal.password.html',
                size: 'lg'
            });
        });
    };
})
// 「行った店」モーダル表示属性
.directive('wentModal', function ($uibModal) {
    return function (scope, element, attr) {
        element.on('click', function () {
            scope.newData = {};
            scope.newData.item = angular.fromJson(attr.wentModal);
            scope.newData.type = true;

            var wentModal = angular.fromJson(attr.wentModal);
            var genreArr = _.filter(scope.genres, function (element) {
                return element.name === wentModal.genreName;
            });
            scope.newData.genre = genreArr[0];
            $uibModal.open({
                scope: scope,
                controller: 'ModalController',
                backdrop: 'static',
                templateUrl: './components/directive/modal/modal.went.html'
            });
        });
    };
})
// 「行った店」編集モーダル表示属性
.directive('wentEditModal', function ($uibModal) {
    return function (scope, element, attr) {
        element.on('click', function () {
            scope.editData = {};
            scope.editData = angular.fromJson(attr.wentEditModal);
            scope.editData.updateFlg = true;

            $uibModal.open({
                scope: scope,
                controller: 'ModalController',
                backdrop: 'static',
                templateUrl: './components/directive/modal/modal.went.edit.html'
            });
        });
    };
})
// 「行きたい店」モーダル表示属性
.directive('wantGoModal', function ($uibModal) {
    return function (scope, element, attr) {
        element.on('click', function () {
            scope.newData = {};
            scope.newData.item = angular.fromJson(attr.wantGoModal);

            scope.newData.type = false;

            $uibModal.open({
                scope: scope,
                controller: 'ModalController',
                backdrop: 'static',
                templateUrl: './components/directive/modal/modal.wantGo.html'
            });
        });
    };
})
// 画像投稿モーダル表示属性
.directive('photoModal', function ($uibModal) {
    return function (scope, element) {
        element.on('click', function () {

            $uibModal.open({
                scope: scope,
                controller: 'ModalController',
                backdrop: 'static',
                templateUrl: './components/directive/modal/modal.photo.html'
            });
        });
    };
});