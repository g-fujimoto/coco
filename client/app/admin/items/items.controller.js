angular.module('webApp')
    .controller('ItemsController', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {

                //アラート用の空の配列を作成
                $scope.alerts = [];

                //アイテム情報全件表示
                $http.get('/api/admin/items')
                    .success(function(data) {
                        $scope.users = data;
                        console.log(data);
                    });

                //シーン詳細モーダルを表示
                $scope.showModalScenes = function($index) {
                    $scope.modalTitle = 'ユーザー情報編集';
                    $scope.btnClass   = 'success';
                    $scope.modalRegisterFlg = false;
                    $scope.modalUpdateFlg   = true;
                    $scope.email = $scope.users[$index].email;
                    $scope.password = $scope.users[$index].password;
                    $scope._id = $scope.users[$index]._id;
                    $scope.index = $index;
                    $uibModal.open({
                        controller : 'UsersModalController',
                        templateUrl: 'app/users/users.modal.register.html',
                        scope: $scope,
                        backdrop: 'static'
                    });
                };

                //ジャンル詳細モーダルを表示
                $scope.showModalGenres = function($index) {
                    $scope.modalTitle = 'ユーザー情報編集';
                    $scope.btnClass   = 'success';
                    $scope.modalRegisterFlg = false;
                    $scope.modalUpdateFlg   = true;
                    $scope.email = $scope.users[$index].email;
                    $scope.password = $scope.users[$index].password;
                    $scope._id = $scope.users[$index]._id;
                    $scope.index = $index;
                    $uibModal.open({
                        controller : 'UsersModalController',
                        templateUrl: 'app/users/users.modal.register.html',
                        scope: $scope,
                        backdrop: 'static'
                    });
                };

                //タグ詳細モーダルを表示
                $scope.showModalTags = function($index) {
                    $scope.modalTitle = 'ユーザー情報編集';
                    $scope.btnClass   = 'success';
                    $scope.modalRegisterFlg = false;
                    $scope.modalUpdateFlg   = true;
                    $scope.email = $scope.users[$index].email;
                    $scope.password = $scope.users[$index].password;
                    $scope._id = $scope.users[$index]._id;
                    $scope.index = $index;
                    $uibModal.open({
                        controller : 'UsersModalController',
                        templateUrl: 'app/users/users.modal.register.html',
                        scope: $scope,
                        backdrop: 'static'
                    });
                };

                //店舗編集モーダルを表示
                $scope.showModalEdit = function($index) {
                    $scope.modalTitle = 'ユーザー情報編集';
                    $scope.btnClass   = 'success';
                    $scope.modalRegisterFlg = false;
                    $scope.modalUpdateFlg   = true;
                    $scope.email = $scope.users[$index].email;
                    $scope.password = $scope.users[$index].password;
                    $scope._id = $scope.users[$index]._id;
                    $scope.index = $index;
                    $uibModal.open({
                        controller : 'UsersModalController',
                        templateUrl: 'app/users/users.modal.register.html',
                        scope: $scope,
                        backdrop: 'static'
                    });
                };

                //店舗削除モーダルを表示
                $scope.showModalDelete = function($index) {
                    $uibModal.open({
                        controller: 'UsersModalController',
                        templateUrl: 'app/users/users.modal.delete.html',
                        scope: $scope,
                        backdrop: 'static'
                    });
                    $scope.selectRowNo = $index;
                };
    }]);
