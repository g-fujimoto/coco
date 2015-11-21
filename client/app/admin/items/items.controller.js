angular.module('webApp')
    .controller('ItemsController', ['$scope', '$http', '$uibModal', 'modalService', function($scope, $http, $uibModal, modalService) {

                //アラート用の空の配列を作成
                $scope.alerts = [];

                //アイテム情報全件表示
                $http.get('/api/admin/items')
                    .success(function(data) {
                        console.log(data);
                        $scope.items = data;
                    });

                //シーンモーダル呼び出し
                $scope.showScencesModal = function() {
                    var data = 'hello';
                    modalService.open($scope, './components/modal/modal.register.html', data);
                };
                //ジャンルモーダル呼び出し
                $scope.showGenresModal = function() {
                    var data = 'ジャンル';
                    modalService.open($scope, './components/modal/modal.register.html', data);

                };
                //タグモーダル呼び出し
                $scope.showTagsModal = function() {
                    var data = 'hello';
                    modalService.open($scope, './components/modal/modal.tags.html', data);
                };

                //編集モーダル呼び出し
                $scope.showEditModal = function() {
                    var data = 'hello';
                    modalService.open($scope, './components/modal/modal.edit.html', data);
                };


                //削除モーダル呼び出し
                $scope.showDeleteModal = function() {
                    modalService.open($scope, './components/modal/modal.delete.html');
                };
    }]);
