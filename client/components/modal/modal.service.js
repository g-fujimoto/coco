var app = angular.module('webApp');

app.service('modalService', ['$uibModal', '$http', function($uibModal, $http) {

    /**
     * モーダルオープン
     * @author t.fujimoto
     * @param  {$scope} scope       呼び出し元スコープ
     * @param  {string} templateUrl モーダルテンプレート
     */
    this.open = function(obj) {
        obj.scope.title = obj.title;
        obj.scope.titleEng = obj.titleEng;
        $uibModal.open({
            templateUrl: obj.modalUrl,
            scope: obj.scope,
            controller: 'ModalController',
            backdrop: 'static'
        });
    };

    this.delete = function(obj) {
        var _id = obj.id;

        $http.delete(obj.apiUrl + '/' + _id)
            .success(function(data) {
                $uibModal.dismiss();
                $scope.dataName.splice(id, 1);
            });
    };


}]);
