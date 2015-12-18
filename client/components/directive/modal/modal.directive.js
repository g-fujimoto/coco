angular.module('webApp')
    // 削除モーダル表示属性
    .directive('deleteModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                    scope.data = angular.fromJson(attr.deleteModal);
                    $uibModal.open({
                        scope,
                        controller  : 'ModalController',
                        backdrop    : 'static',
                        templateUrl : './components/directive/modal/modal.delete.html'
                    });
            });
        };
    })
    // 管理者更新モーダル表示属性
    .directive('editModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                scope.editData = angular.fromJson(attr.editModal);
                $uibModal.open({
                    scope,
                    controller :'ModalController',
                    backdrop   : 'static',
                    templateUrl: `./components/directive/modal/admin/${scope.apiName}/modal.edit.html`,
                    size: 'lg'
                });
            });
        };
    })
    // プロフィール更新モーダル表示属性
    .directive('editProfileModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                scope.editData = angular.fromJson(attr.editProfileModal);
                $uibModal.open({
                    scope,
                    controller :'ModalController',
                    backdrop   : 'static',
                    templateUrl: `./components/directive/modal/modal.edit.html`,
                    size: 'lg'
                });
            });
        };
    })
    // パスワード変更モーダル表示属性
    .directive('editPasswordModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                scope.editData = angular.fromJson(attr.editModal);
                $uibModal.open({
                    scope,
                    controller :'ModalController',
                    backdrop   : 'static',
                    templateUrl: `./components/directive/modal/modal.password.html`,
                    size: 'lg'
                });
            });
        };
    })
    // 「行った店」モーダル表示属性
    .directive('wentModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                scope.newData = {};
                scope.newData.item = angular.fromJson(attr.wentModal);
                scope.newData.type = true;

                var wentModal = angular.fromJson(attr.wentModal);
                const genreArr = _.filter(scope.genres, (element) => {
                    return element.name === wentModal.genreName;
                });
                scope.newData.genre = genreArr[0];
                $uibModal.open({
                    scope,
                    controller  : 'ModalController',
                    backdrop    : 'static',
                    templateUrl : './components/directive/modal/modal.went.html'
                });
            });
        };
    })
    // 「行った店」編集モーダル表示属性
    .directive('wentEditModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                scope.editData = {};
                scope.editData = angular.fromJson(attr.wentEditModal);
                scope.editData.updateFlg = true;

                $uibModal.open({
                    scope,
                    controller  : 'ModalController',
                    backdrop    : 'static',
                    templateUrl : './components/directive/modal/modal.went.edit.html'
                });
            });
        };
    })
    // 「行きたい店」モーダル表示属性
    .directive('wantGoModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                scope.newData = {};
                scope.newData.item = angular.fromJson(attr.wantGoModal);

                scope.newData.type = false;

                $uibModal.open({
                    scope,
                    controller  : 'ModalController',
                    backdrop    : 'static',
                    templateUrl : './components/directive/modal/modal.wantGo.html'
                });
            });
        };
    })
    // 画像投稿モーダル表示属性
    .directive('photoModal', ($uibModal) => {
        return (scope, element) => {
            element.on('click', () => {

                $uibModal.open({
                    scope,
                    controller  : 'ModalController',
                    backdrop    : 'static',
                    templateUrl : './components/directive/modal/modal.photo.html'
                });
            });
        };
    });
