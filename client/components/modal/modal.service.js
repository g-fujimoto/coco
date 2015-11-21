var app = angular.module('webApp');

app.service('modalService', ['$uibModal', '$http', function($uibModal, $http) {

    /**
     * モーダルオープン
     * @author t.fujimoto
     * @param  {$scope} scope       呼び出し元スコープ
     * @param  {string} templateUrl モーダルテンプレート
     */
    this.open = function(scope, templateUrl, data) {
        scope.title = 'ジャンル';
        scope.titleEng = 'genre';
        $uibModal.open({
            templateUrl: templateUrl,
            scope: scope,
            controller: 'ModalController',
            backdrop: 'static'
        });
    };

    /**
     * モダール内削除処理
     * @author t.fujimoto
     * @param  {string} id       削除対象レコードの_id
     * @param  {string} dataName 削除するデータが入っている配列の名称
     * @param  {$scope} scope    呼び出し元スコープ
     * @param  {string} apiUrl   サーバーapiUrl
     */
    this.delete = function(id, dataName, scope, apiUrl) {
        var _id = id;

        $http.delete(apiUrl + '/' + _id)
            .success(function(data) {
                $uibModal.dismiss();
                $scope.dataName.splice(id, 1);
            });
    };


}]);
