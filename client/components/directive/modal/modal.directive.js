angular.module('webApp')
    // 削除モーダル表示属性
    .directive('deleteModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                    scope.data = scope.datas[attr.deleteModal];
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
                    templateUrl: `./components/directive/modal/${scope.apiName}/modal.edit.html`
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

                var wentModal = angular.fromJson(attr.wentModal);
                const genreArr = _.filter(scope.genrelists, (element) => {
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
                scope.$apply.modalOption = {
                    item    : attr.wantGoModal,
                    modalUrl : './components/directive/modal/modal.wantGo.html'
                };


                $uibModal.open({
                    scope,
                    controller  : 'ModalController',
                    backdrop    : 'static',
                    templateUrl : './components/directive/modal/modal.wantGo.html'
                });
            });
        };
    });
