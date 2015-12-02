angular.module('webApp')
    .directive('deleteModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                    scope.$apply._id   = scope.datas[attr.deleteModal]._id;
                    scope.$apply.index = attr.modalDelete;
                    $uibModal.open({
                        scope: scope,
                        controller  : 'ModalController',
                        backdrop    : 'static',
                        templateUrl : './components/directive/modal/modal.delete.html'
                    });
            });
        };
    })
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
    .directive('wantGoModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                scope.$apply.modalOption = {
                    scope,
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
