var app = angular.module('webApp');

app.service('$modalService', ['$uibModal', '$http', function($uibModal, $http) {

    /**
     * モーダルオープン
     * @author t.fujimoto
     * @param  {$scope} scope       呼び出し元スコープ
     * @param  {string} templateUrl モーダルテンプレート
     */
    this.open = function(modalOption) {
        $uibModal.open({
            templateUrl: modalOption.modalUrl,
            scope      : modalOption.scope,
            controller : 'ModalController',
            backdrop   : true
        });
    };

}]);
