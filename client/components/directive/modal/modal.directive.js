angular.module('webApp')
    .directive('deleteModal', ($uibModal) => {
        return (scope, element, attr) => {
            element.on('click', () => {
                    scope._id   = scope.comments[attr.modalDelete]._id;
                    scope.index = attr.modalDelete;
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
