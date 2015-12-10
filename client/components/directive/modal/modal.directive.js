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
    // 更新モーダル表示属性
    .directive('editModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                scope.editData = angular.fromJson(attr.editModal);
                $uibModal.open({
                    scope,
                    controller :'ModalController',
                    backdrop   : 'static',
                    templateUrl: `./components/directive/modal/${scope.apiName}/modal.edit.html`,
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

                //  ------ dummy ----- //
                scope.newData.sceneSamples = [
                    {label: 'value1', rate1: 1, rate2: 1, rate3: 1, rate4: 1, rate5: 1},
                    {label: 'value2', rate1: 1, rate2: 1, rate3: 1, rate4: 1, rate5: 1},
                    {label: 'value3', rate1: 1, rate2: 1, rate3: 1, rate4: 1, rate5: 1},
                    {label: 'value4', rate1: 1, rate2: 1, rate3: 1, rate4: 1, rate5: 1},
                    {label: 'value5', rate1: 1, rate2: 1, rate3: 1, rate4: 1, rate5: 1}
                ];
                // -------------------- //

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
    // 「行きたい店」モーダル表示属性
    .directive('wantGoModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                scope.newData = {};
                scope.newData.item = angular.fromJson(attr.wantGoModal);
                scope.newData.type = false;
                var wantGoModal = angular.fromJson(attr.wantGoModal);
                const genreArr = _.filter(scope.genres, (element) => {
                    return element.name === wantGoModal.genreName;
                });
                scope.newData.genre = genreArr[0];

                $uibModal.open({
                    scope,
                    controller  : 'ModalController',
                    backdrop    : 'static',
                    templateUrl : './components/directive/modal/modal.wantGo.html'
                });
            });
        };
    });
