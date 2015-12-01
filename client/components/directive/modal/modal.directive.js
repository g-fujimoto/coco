angular.module('webApp')
    .directive('deleteModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                    console.log(scope.apiName);
                    scope.$apply._id   = scope.datas[attr.deleteModal]._id;
                    scope.$apply.index = attr.modalDelete;
                    $uibModal.open({
                        controller  : 'ModalController',
                        backdrop    : 'static',
                        scope       : scope,
                        templateUrl : './components/directive/modal/modal.delete.html'
                    });
            });
        };
    })
    .directive('wentModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {

                var genre = _.select(scope.genrelist, function(num) {
                    return num.name == attr.wentModal.genreName
                });

                $uibModal.open({
                    controller  : 'ModalController',
                    backdrop    : 'static',
                    scope       : scope,
                    templateUrl : './components/directive/modal/modal.went.html'
                });
            });
        };
    })
    .directive('wantGoModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                scope.$apply.modalOption = {
                    item    : attr.wantGoModal,
                    modalUrl : './components/directive/modal/modal.wantGo.html',
                    scope    : scope
                };

                $uibModal.open({
                    controller  : 'ModalController',
                    backdrop    : 'static',
                    scope       : scope,
                    templateUrl : './components/directive/modal/modal.wantGo.html'
                });
            });
        };
    });
