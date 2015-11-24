angular.module('webApp')
    .controller('ItemsController', ['$scope', '$http', '$uibModal', 'modalService', '$state',
            function($scope, $http, $uibModal, modalService, $state) {

                //アラート用の空の配列を作成
                $scope.alerts = [];

                $scope.$watch('scene', function(newValue, oldValue) {
                    console.log(newValue);
                    console.log(oldValue);
                });



                //アイテム情報全件表示
                $http.get('/api/admin/items')
                    .success(function(data) {
                        $scope.items = data;
                    });

                //新規登録
                $scope.registerItem = function() {

                    $http.post('/api/admin/items', {
                        itemName        : $scope.itemName,
                        itemKana        : $scope.itemKana,
                        itemBranch      : $scope.itemBranch,
                        itemOtherName   : $scope.itemOtherName,
                        itemTel         : $scope.itemTel,
                        itemIntroduction: $scope.itemIntroduction,
                        address         : $scope.address,
                        scene           : $scope.scene,
                        genre           : $scope.genre,
                    })
                    .success(function(data) {
                        if(data === 'error') {
                            console.log('エラーだよ');
                        } else {
                            $scope.items.push(data);
                            // $alerts.push('success');
                            // console.log($alerts);
                            $state.go('items');
                        }
                    });
                };


// ----------------------------------------------- モーダル呼び出し -----------------------------------------------//

                //シーンモーダル呼び出し
                $scope.showScencesModal = function() {
                    modalService.open({
                        scope: $scope,
                        modalUrl: './components/modal/modal.register.html',
                        title: 'シーン',
                        titleEng: 'scenes'
                    });
                };

                //ジャンルモーダル呼び出し
                $scope.showGenresModal = function() {
                    modalService.open({
                        scope: $scope,
                        modalUrl: './components/modal/modal.register.html',
                        title: 'ジャンル',
                        titleEng: 'genres'
                    });
                };

                //タグモーダル呼び出し
                $scope.showTagsModal = function() {
                    modalService.open({
                        scope: $scope,
                        modalUrl: './components/modal/modal.tags.html',
                        title: 'タグ',
                        titleEng: 'tags'
                    });
                };

                //編集モーダル呼び出し
                $scope.showEditModal = function() {
                    modalService.open({
                        scope: $scope,
                        modalUrl: './components/modal/modal.edit.html'
                    });
                };

                //削除モーダル呼び出し
                $scope.showDeleteModal = function() {
                    modalService.open({
                        scope: $scope,
                        modalUrl: './components/modal/modal.delete.html'
                    });
                };
    }]);
