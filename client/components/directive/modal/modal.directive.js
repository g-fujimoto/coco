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
                scope.data = scope.datas[attr.editModal];
                scope.editData = _.clone(scope.data);
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
        return (scope, element) => {
            element.on('click', () => {
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
